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
	opacity: number;
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
	// General definitions
	const router = useRouter();
	const searchParams = useSearchParams();
	const cogUrl = searchParams.get("cogUrl");

	// Handling map view (lat, lon)
	const createQueryStringCallback = useCallback(createQueryString, [
		searchParams,
	]);

	// Handling layer incremental indexing
	const versionRef = useRef(0);
	const increaseLayerVersion = () => {
		versionRef.current += 1;
	};

	// Handling data source URL
	const cogUrlRef = useRef<string | undefined>();



	// Handling COG parameters
	const defaultParams = {
		"alpha": 100
	};
	const [params, setParams] = useState(defaultParams);
	useEffect(() => {
		const gotParams = getCogParams(searchParams);

		setParams((prevParams: any) => {
			// Use deep comparison to check if params have changed
			if (!isEqual(prevParams, gotParams)) {
				return gotParams;
			}
			return prevParams;
		});
	}, [searchParams]);





	const [cogBitmapLayer, setCogBitmapLayer] = useState<LayerDefinition | null>(
		null
	);




	const initLayer = () => {
		increaseLayerVersion();

		const layerDefinition: LayerDefinition = {
			key: `CogBitmapLayer_${versionRef.current}`,
			layerKey: `CogBitmapLayer`,
			name: "CogBitmapLayer_",
			opacity: params.alpha * 0.01,
			options: {
				url: cogUrl || undefined,
				type: "image",
				cogBitmapOptions: {
					...params,
				},
			},
			type: "cogBitmap",
		};

		setCogBitmapLayer(layerDefinition);
	};




	if (cogUrl && cogUrlRef.current !== cogUrl) {
		cogUrlRef.current = cogUrl;
		initLayer();
	}

	// Handling COG URL continue ...
	useEffect(() => {
		if (params) {
			initLayer();
		}
	}, [params]);





	/******************************
	 *  MAP VIEW STATE MANAGEMENT
	 ******************************/

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