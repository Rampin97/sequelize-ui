import React from 'react'
import { classnames } from 'tailwindcss-classnames'
import { lookupOptionKey, lookupOptionValue, optionsToList } from '../shared/options'
import { CommonFieldProps, CommonInputProps, CommonOptionsProps } from '../shared/types'

type SelectProps<T> = CommonInputProps<T> & CommonOptionsProps<T> & CommonFieldProps

function Select<T>({
  id,
  label,
  value,
  options,
  error,
  display,
  onChange,
}: SelectProps<T>): React.ReactElement {
  const handleChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const key = evt.target.value
    const option = lookupOptionValue(options, key)
    if (option) onChange(option)
  }

  return (
    <>
      <label htmlFor={id} className={classnames('flex', 'flex-col', 'items-start')}>
        {label}
        <select
          id={id}
          onChange={handleChange}
          value={lookupOptionKey(options, value)}
          aria-invalid={!!error}
          aria-describedby={`${id}-alert`}
        >
          {optionsToList(options).map(([k, v]) => (
            <option key={id + k} value={k}>
              {display(v)}
            </option>
          ))}
        </select>
      </label>
      <span id={`${id}-alert`} role={error ? 'alert' : undefined} aria-hidden={!error}>
        {error}
      </span>
    </>
  )
}

// Cast is necessary because HOC's don't preserve generics
export default React.memo(Select) as typeof Select
