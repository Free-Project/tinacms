/**

Copyright 2019 Forestry.io Inc

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

import * as React from 'react'
import { ChangeEvent, useState } from 'react'
import { Plugin } from '@tinacms/core'

import { Format } from '../../translator'
import { ImageProps } from '../../types'
import { Wysiwyg } from '../Editor'

export interface RawModeEditorProps {
  defaultValue: string
  onChange: (value: string) => void
  plugins?: Plugin[]
  sticky?: boolean
  format?: Format
  imageProps?: ImageProps
}

export const RawModeEditor = ({
  defaultValue,
  // onChange,
  plugins,
  sticky,
  format,
  imageProps,
}: RawModeEditorProps) => {
  const [mode, setMode] = useState('wysiwyg')
  const [value, setValue] = useState(defaultValue)

  const handleModeChange = (evt: ChangeEvent<HTMLInputElement>) =>
    setMode(evt.target.value)

  return (
    <>
      <div>
        <input
          type="radio"
          name="mode"
          value="wysiwyg"
          checked={mode === 'wysiwyg'}
          onChange={handleModeChange}
        />
        <span>Wysiwyg mode</span>
        <br />
        <input
          type="radio"
          name="mode"
          value="raw"
          checked={mode === 'raw'}
          onChange={handleModeChange}
        />
        <span>Raw mode</span>
      </div>
      {mode === 'raw' ? (
        <textarea value={value} onChange={evt => setValue(evt.target.value)} />
      ) : (
        <Wysiwyg
          input={{
            value,
            onChange: setValue,
          }}
          plugins={plugins}
          sticky={sticky}
          format={format}
          imageProps={imageProps}
        />
      )}
    </>
  )
}
