import $ from 'jquery'
import axios from 'axios'
import React, { useState, useRef } from 'react'
import Noty from 'noty'
import SiteRecaptcha from '@/components/SiteRecaptcha'
import { axiosSureThing } from '@/utils/surething'
import serializeDataToJson from '@/utils/serializeDataToJson'

import './FooterSubscribeForm.scss'

const FooterSubscribeForm = ({
	title,
	info,
	endpoint
}) => {
	const recaptchaRef = useRef(null)
	const [isSubmitting, setSubmitting] = useState(false)

	const onFormSubmit = async ev => {
		ev.preventDefault()
		setSubmitting(true)

		const el = ev.target
		const $el = $(el)

		await recaptchaRef.current.executeAsync()

		const { ok, data, error } = await axiosSureThing(
			axios.post(
				el.action,
				{
					...serializeDataToJson($el),
				},
				{
					headers: { Accept: 'application/json' },
				}
			)
		)
		const noty = new Noty({
			text: '',
			theme: 'metroui',
			layout: 'topCenter',
			timeout: 5000,
			// visibilityControl: true,
			killer: true,
		})
		if (ok) {
			noty.setText(data.message, true)
			noty.setType('success', true)
			el.reset()
			recaptchaRef.current.reset()
		} else {
			noty.setText(data.message || error, true)
			noty.setType('error', true)
		}
		noty.show()
		el.focus()
		setSubmitting(false)
	}

	return (
		<form action={endpoint} onSubmit={onFormSubmit}>
			{!!title && (
				<div className="b-fsregular font-bold mb-4">{title}</div>
			)}
			<div className="mb-6 flex">
				<label className="flex-1">
					<span className="sr-only">Email address</span>
					<input
						type="email"
						name="email"
						placeholder="Your email address"
						className="w-full bg-white h-9.5 px-2.5 py-3 flex-1 b-fsregular md:b-fsxtiny"
						required
					/>
				</label>
				<button
					className="inline-flex items-center justify-center w-9.5 h-9.5 bg-yellow flex-shrink-0 disabled:opacity-50"
					aria-label="Submit"
					disabled={isSubmitting}
				>
					<svg
						aria-hidden="true"
						focusable="false"
						width="38"
						height="39"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M28.843 10.238L8.164 16.603l4.206 3.6 12.363-6.736-10.19 8.596v5.596l2.688-3.295 3.97 3.4 7.642-17.526z"
							fill="currentColor"
						/>
					</svg>
				</button>
				<SiteRecaptcha propRef={recaptchaRef}></SiteRecaptcha>
			</div>
			{!!info && <p className="small font-normal">{info}</p>}
		</form>
	)
}

export default FooterSubscribeForm;
