import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { createQueryString } from '@/utils/url'
import { ReactNode, useCallback, useState } from 'react'
import Input from './input'

export default function ({ title, name, min, max, defaultValue, children }: { name: string, title: string, children: ReactNode, min: number, max: number, defaultValue: any }) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const createQueryStringCallback = useCallback(createQueryString, [searchParams])
	const urlVal = searchParams.get(name) !== null && searchParams.get(name) !== '' ? Number(searchParams.get(name)) : ''

	const [rangeValue, setRangeValue] = useState(100);

	const onChanged = (evt: any) => {
		const val = evt.target.value;
		setRangeValue(val)
		router.push('?' + createQueryStringCallback(name, val, Array.from(searchParams.entries())).toString(), { scroll: false })
	}

	return <label className="block mt-2">
		<span className="block text-base font-medium text-slate-900 mb-1">{title}</span>
		<Input className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
			onChange={onChanged} value={urlVal} type='range' min={min} max={max} step={1} />
		{children}
	</label>
}