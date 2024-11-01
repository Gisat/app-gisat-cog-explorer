import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { createQueryString } from '@/utils/url'
import { ReactNode, useCallback } from 'react'
import Input from './input'

export default function ({ title, name, defaultValue, children }: { name: string, title: string, defaultValue: any, children: ReactNode }) {
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
		<Input className="appearance-none border rounded w-full py-2 px-3 text-slate-900 leading-tight focus:outline-none focus:shadow-outline"
			onChange={onChanged} value={urlVal} placeholder={defaultValue} type='number' step="any" />
		{children}
	</label>
}