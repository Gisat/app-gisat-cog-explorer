import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { createQueryString } from '@/utils/url'
import { ReactNode, useCallback } from 'react'

export default function ({ title, name, defaultValue, children }: { name: string, title: string, defaultValue: any, children: ReactNode }) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const createQueryStringCallback = useCallback(createQueryString, [searchParams])
	const urlVal = searchParams.get(name) === 'true'

	const onChanged = (evt: any) => {
		const val = evt.target.checked;
		router.push('?' + createQueryStringCallback(name, val, Array.from(searchParams.entries())).toString(), { scroll: false })

	}

	return <label className="block mt-2">
		<div className='flex items-center w-full'>
			<span className="block text-base font-medium text-slate-900">{title}</span>
			<input className="ml-2" onChange={onChanged} checked={searchParams.has(name) ? urlVal : defaultValue} type='checkbox' />
		</div>
		{children}
	</label>
}