"use client"

import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { createQueryString } from '../../utils/url'
import { isValidColor, isValidColorScale, isValidCommaSeparatedNumbers, isValidCommaSeparatedValueColorPairs } from '../../utils/dataTypes'
import CogBitmapParams from '@/data/CogBitmapParams'
import { useCallback, useState } from 'react'

import BoolOption from './options/BoolOption'
import NumberOption from './options/NumberOption'
import ColorOption from './options/ColorOption'
import TextOption from './options/TextOption'
import ArrayOption from './options/ArrayOption'
import RangeOption from './options/RangeOption'

const getValidator = (validatorType: string) => {

  switch (validatorType) {
    case 'color':
      return isValidColor
    case 'colorScale':
      return isValidColorScale
    case 'commaSeparatedNumbers':
      return isValidCommaSeparatedNumbers
    case 'commaSeparatedValueColorPairs':
      return isValidCommaSeparatedValueColorPairs
    default:
      return null
  }
}

function CogRasterForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const cogUrl = searchParams.get('cogUrl')
  const [stateCogUrl, setStateCogUrl] = useState(cogUrl)

  const createQueryStringCallback = useCallback(createQueryString, [searchParams])

  // // Get a new searchParams string by merging the current
  // // searchParams with a provided key/value pair
  // const createQueryString = useCallback(
  //   (name: string, value: string) => {
  //     const params = new URLSearchParams(searchParams)
  //     params.set(name, value)

  //     return params.toString()
  //   },
  //   [searchParams]
  // )

  const onUrlChange = (evt: any) => {
    const cogUrl = evt.target.value;
    setStateCogUrl(cogUrl)
    router.push('?' + createQueryStringCallback('cogUrl', cogUrl, Array.from(searchParams.entries())).toString(), { scroll: false })
  }

  return (
    <div className='ptr-form'>

      <div className='w-32'>
        <a href='/'>
          <img src='/gisat.svg' />
        </a>
      </div>

      <label className="block mt-8">
        <span className="block text-base font-medium text-slate-900 mb-1">COG Url</span>
        <input className="appearance-none border rounded w-full py-2 px-3 text-slate-900 leading-tight focus:outline-none focus:shadow-outline" onChange={onUrlChange} value={stateCogUrl?.toString()} />
      </label>
      {
        CogBitmapParams.map(d => {
          const type = typeof d.type === 'string' ? d.type : d.type.inputType
          const value = typeof d.type === 'object' ? d.type.value : null
          switch (type) {
            case 'bool':
              return <BoolOption title={d.title} name={d.name} key={d.name} defaultValue={d.defaultValue}>
                <p className="text-sm text-slate-500">
                  {d.description}
                </p>
              </BoolOption>
            case 'range':
              return <RangeOption title={d.title} name={d.name} key={d.name} min={0} max={100} defaultValue={d.defaultValue}>
                <p className="text-sm text-slate-500">
                  {d.description}
                </p>
              </RangeOption>
            case 'number':
              return <NumberOption title={d.title} name={d.name} key={d.name} defaultValue={d.defaultValue}>
                <p className="text-sm text-slate-500">
                  {d.description}
                </p>
              </NumberOption>
            case 'color':
              return <ColorOption title={d.title} name={d.name} key={d.name} defaultValue={d.defaultValue}>
                <p className="text-sm text-slate-500">
                  {d.description}
                </p>
              </ColorOption>
            case 'text':
              return <TextOption title={d.title} name={d.name} key={d.name} defaultValue={d.defaultValue} validation={typeof d.type === 'object' ? getValidator(d.type.value) : undefined}>
                <p className="text-sm text-slate-500">
                  {d.description}
                </p>
              </TextOption>
            case 'array':
              return <ArrayOption title={d.title} name={d.name} key={d.name} defaultValue={d.defaultValue} validation={typeof d.type === 'object' ? getValidator(d.type.value) : undefined}>
                <p className="mt-2 text-sm text-slate-500">
                  {d.description}
                </p>
              </ArrayOption>
            default:
              return null
          }

        })
      }
    </div >
  )
}

export default CogRasterForm;