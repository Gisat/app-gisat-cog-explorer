import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { createQueryString } from '../../../utils/url'
import { ReactNode, useCallback } from 'react'
import Input from './input'

export default function ({ title, name, min, max, children }: { name: string, title: string, children: ReactNode, min: number, max: number }) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const createQueryStringCallback = useCallback(createQueryString, [searchParams])
	const urlVal = searchParams.get(name) !== null && searchParams.get(name) !== '' ? Number(searchParams.get(name)) : ''

	const onChanged = (evt: any) => {
		const val = evt.target.value;
		router.push('?' + createQueryStringCallback(name, val, Array.from(searchParams.entries())).toString(), { scroll: false })
	}

	return <label className="block mt-2">
		<span className="block text-base font-medium text-slate-900 mb-1">{title}</span>
		<Input className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
			onChange={onChanged} value={urlVal} type='range' min={min} max={max} step={1} />
		{children}
	</label>
}

// http://localhost:3010/?cogUrl=https%3A%2F%2Fgisat-gis.eu-central-1.linodeobjects.com%2FesaGdaAdbNepal23%2Frasters%2Fsentinel_cog%2F2019-11-12-00_00_2019-11-12-23_59_Sentinel-2_L1C_SWIR_cog_nodata.tif&color=green&blurredTexture=true&useAutoRange=true&lon=85.5416328186211&lat=27.989141668182786&boxRange=26603.61542468061&useDataForOpacity=false&alpha=86