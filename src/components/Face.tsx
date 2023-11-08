import React from 'react'

type Props = {
    type: "smile" | "frown"
}

export default function Smiley({type}: Props) {
  return (
    <div className={`smiley smiley--${type}`} role="presentation">
        <div className="face">
            <div className="eyes">
                <div className="eye eye-left"></div>
                <div className="eye eye-right"></div>
            </div>
            <div className="mouth"></div>
        </div>
    </div>
  )
}