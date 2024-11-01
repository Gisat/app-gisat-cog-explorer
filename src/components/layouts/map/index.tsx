"use client"

import { DeckGlMap } from "@gisatcz/ptr-maps";
import { useRef, useState, useCallback } from 'react';

import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { createQueryString } from '@/utils/url'
import { transformToColor, transformToColorScale, transformToCommaSeparatedNumbers, transformToCommaSeparatedValueColorPairs } from '@/utils/dataTypes'

import { cogSettings } from '@/config/cog/cog-tools-config'
import chroma from "chroma-js";

// Import types
import { CogValueType } from '@/config/cog/cog-value-types'

type LayerDefinition = {
	key: string;
	layerKey: string;
	name: string;
	opacity?: number;
	options: {
		colorScale?: string[];
		useHeatMap?: boolean;
		colorScaleValueRange?: number[];
		useChannel?: number | undefined;
		clipLow?: number;
		clipHigh?: number;
		blurredTexture?: boolean;
		url: undefined | string;
		type: string;
		hoverable?: boolean;
		pickable?: boolean;
		cogBitmapOptions: any;
	};
	type: string;
}

// const CustomTooltip = () => {
// }

function Map() {

	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()!

	const createQueryStringCallback = useCallback(createQueryString, [searchParams])

	const versionRef = useRef(0)

	const cogUrlRef = useRef<string | undefined>()
	const cogUrl = searchParams.get('cogUrl')

	// params

	type params = {
		[key: string]: any
	}
	const dafaultParams: params = {};

	const paramsRef = useRef(dafaultParams)

	const [cogBitmapLayer, setCogBitmapLayer] = useState<LayerDefinition | null>(null);

	const increaseLayerVersion = () => {
		versionRef.current = versionRef.current + 1
	}

	const getBoolValues = () => {

		const values: params = {}

		for (const p of cogSettings) {
			if (p.valueType === CogValueType.Boolean) {
				const isTrue = paramsRef.current[p.name] === 'true';
				if (p.defaultValue !== isTrue) {
					values[p.name] = isTrue;
				}
			}
		}

		return values;
	}

	const getRangeValues = () => {

		const values: params = {}

		for (const p of cogSettings) {
			if (p.valueType === CogValueType.Boolean) {
				const parsed = Number.parseFloat(paramsRef.current[p.name]);

				if (searchParams.has(p.name) && Number.isFinite(parsed) && parsed !== p.defaultValue) {
					values[p.name] = parsed
				}
			}
		}

		return values;
	}

	const getNumberValues = () => {

		const values: params = {}

		for (const p of cogSettings) {
			if (p.valueType === CogValueType.Number) {
				const parsed = Number.parseFloat(paramsRef.current[p.name]);

				if (searchParams.has(p.name) && Number.isFinite(parsed) && parsed !== p.defaultValue) {
					values[p.name] = parsed
				}
			}
		}

		return values;
	}

	const getAsArray = (string: string) => {
		try {
			const parsed = string.split(",");
			if (parsed && parsed.length > 2) {
				const withNumbers = parsed.map(n => Number.parseInt(n) || n)
				return withNumbers
			} else {
				return null
			}
		} catch (error) {
			return null
		}
	}

	const getColorValues = () => {

		const values: params = {}

		for (const p of cogSettings) {
			if (p.valueType === CogValueType.Color) {
				const asColor = transformToColor(paramsRef.current[p.name])
				if (chroma.valid(asColor)) {
					values[p.name] = asColor
				}
			}
		}

		return values;
	}

	/*	const getTextValues = () => {
	
			const values: params = {}
	
			for (const p of cogSettings) {
				const type = typeof p.type === 'string' ? p.type : p.type.inputType
				if (type === 'text') {
					let textValue = null
					const value = typeof p.type === 'string' ? null : p.type.value
					if (value === 'color') {
						textValue = transformToColor(paramsRef.current[p.name])
					} else if (value === 'colorScale') {
						textValue = transformToColorScale(paramsRef.current[p.name])
					} else if (value === 'commaSeparatedNumbers') {
						textValue = transformToCommaSeparatedNumbers(paramsRef.current[p.name])
					} else if (value === 'commaSeparatedValueColorPairs') {
						textValue = transformToCommaSeparatedValueColorPairs(paramsRef.current[p.name])
					} else {
						textValue = paramsRef.current[p.name]
					}
	
					if (textValue) {
						values[p.name] = textValue
					}
				}
			}
			return values;
		}
	*/

	const getParams = () => {
		const values = {
			...getBoolValues(),
			...getRangeValues(),
			...getNumberValues(),
			//	...getTextValues(),
		}
		return values;
	}

	const initLayer = () => {
		increaseLayerVersion()

		const params = getParams()

		console.log("FINAL_COG_PARAMS", params);


		const layerDefinition: LayerDefinition = {
			key: `CogBitmapLayer_${versionRef.current}`,
			layerKey: `CogBitmapLayer_${versionRef.current}`,
			name: 'CogBitmapLayer_',
			opacity: 1,
			options: {
				// hoverable: true,
				// pickable: true,
				url: cogUrlRef.current,
				type: 'image',
				cogBitmapOptions: {
					...params,
				}
			},
			type: 'cogBitmap',
		}


		setCogBitmapLayer(layerDefinition)
	}

	if (cogUrl && cogUrlRef.current !== cogUrl) {
		cogUrlRef.current = cogUrl;
		initLayer();
	}

	const changeRef = useRef(false);

	for (const p of cogSettings) {
		if (searchParams.has(p.name)) {
			if (paramsRef.current[p.name] !== searchParams.get(p.name)) {
				changeRef.current = true
				paramsRef.current[p.name] = searchParams.get(p.name);
			}
		} else {
			if (paramsRef.current[p.name] !== p.defaultValue) {
				changeRef.current = true
				paramsRef.current[p.name] = p.defaultValue
			}
		}
	}

	if (changeRef.current === true) {
		initLayer();

		changeRef.current = false
	}

	const lon = searchParams.get('lon') || ''
	const lat = searchParams.get('lat') || ''
	const boxRange = searchParams.get('boxRange')


	const initView: {
		center: {
			lon: number;
			lat: number;
		};
		boxRange: string | number;
	} = {
		center: { lon: Number.parseFloat(lon) || 14.35, lat: Number.parseFloat(lat) || 49.92 },
		boxRange: boxRange || 94088
	}

	const viewRef = useRef(initView)
	const [viewState, setViewState] = useState(initView)

	const onViewChange = (view: any) => {
		viewRef.current = {
			...viewRef.current, ...view
		}

		setViewState(viewRef.current)

		const p1 = createQueryStringCallback('lon', viewRef.current.center.lon, Array.from(searchParams.entries()))
		const p2 = createQueryStringCallback('lat', viewRef.current.center.lat, Array.from(p1.entries()))
		const p3 = createQueryStringCallback('boxRange', viewRef.current.boxRange, Array.from(p2.entries()))

		router.push('?' + p3.toString(), { scroll: false })
	}

	return (
		<DeckGlMap
			view={{ ...viewState }}
			backgroundLayer={{
				key: 'background-osm',
				type: 'wmts',
				options: {
					url: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png'
				}
			}}
			layers={[
				...(cogBitmapLayer && cogUrl ? [cogBitmapLayer] : [])
			]}
			onViewChange={onViewChange}
		/>
	);
}

export default Map;