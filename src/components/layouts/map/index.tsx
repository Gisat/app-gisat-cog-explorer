"use client";

import { DeckGlMap } from "@gisatcz/ptr-maps";
import { useRef, useState, useCallback, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { createQueryString } from "@/utils/url";
import { getCogParams } from "@/utils/get-cog-params";
import isEqual from "lodash.isequal";

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
};

function Map() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const createQueryStringCallback = useCallback(createQueryString, [
		searchParams,
	]);

	const versionRef = useRef(0);
	const cogUrlRef = useRef<string | undefined>();
	const cogUrl = searchParams.get("cogUrl");

	const [cogBitmapLayer, setCogBitmapLayer] = useState<LayerDefinition | null>(
		null
	);

	const increaseLayerVersion = () => {
		versionRef.current += 1;
	};

	// Dynamically update params from URL
	const [params, setParams] = useState<Record<string, any>>({});
	const prevParamsRef = useRef<Record<string, any>>({});

	// Update params whenever searchParams change
	useEffect(() => {
		const updatedParams = getCogParams(searchParams);
		setParams(updatedParams);
	}, [searchParams]);

	// Initialize or update layer whenever params change
	useEffect(() => {
		const paramsHaveChanged = !isEqual(prevParamsRef.current, params);

		if (paramsHaveChanged) {
			// If params have changed, initialize layer and update the previous params reference
			initLayer();
			prevParamsRef.current = params; // Update previous params to current params
		}
	}, [params, cogUrl]); // Depend on params and cogUrl

	const initLayer = () => {
		increaseLayerVersion();

		const layerDefinition: LayerDefinition = {
			key: `CogBitmapLayer_${versionRef.current}`,
			layerKey: `CogBitmapLayer`,
			name: "CogBitmapLayer_",
			opacity: params.alpha * 0.01,
			options: {
				url: cogUrlRef.current,
				type: "image",
				cogBitmapOptions: {
					...params,
				},
			},
			type: "cogBitmap",
		};

		setCogBitmapLayer(layerDefinition);
	};

	// Update cogUrlRef only when cogUrl changes in URL
	useEffect(() => {
		if (cogUrl && cogUrlRef.current !== cogUrl) {
			cogUrlRef.current = cogUrl;
		}
	}, [cogUrl]);

	// Map view state management
	const lon = searchParams.get("lon") || "";
	const lat = searchParams.get("lat") || "";
	const boxRange = searchParams.get("boxRange");

	const initView: {
		center: {
			lon: number;
			lat: number;
		};
		boxRange: string | number;
	} = {
		center: { lon: Number.parseFloat(lon) || 14.35, lat: Number.parseFloat(lat) || 49.92 },
		boxRange: boxRange || 94088,
	};

	//const viewRef = useRef(initView);
	const [viewState, setViewState] = useState(initView);

	const onViewChange = (view: any) => {
		//		viewUpdate = {
		//			...viewRef.current, ...view

		const viewUpdate = {
			...viewState, ...view
		}
		setViewState(viewUpdate)

		const p1 = createQueryStringCallback('lon', viewUpdate.center.lon, Array.from(searchParams.entries()))
		const p2 = createQueryStringCallback('lat', viewUpdate.center.lat, Array.from(p1.entries()))
		const p3 = createQueryStringCallback('boxRange', viewUpdate.boxRange, Array.from(p2.entries()))

		router.push('?' + p3.toString(), { scroll: false })
	}

	return (
		<DeckGlMap
			view={{ ...viewState }}
			backgroundLayer={{
				key: "background-osm",
				type: "wmts",
				options: {
					url: "https://{s}.tile.osm.org/{z}/{x}/{y}.png",
				},
			}}
			layers={[...(cogBitmapLayer && cogUrl ? [cogBitmapLayer] : [])]}
			onViewChange={onViewChange}
		/>
	);
}

export default Map;