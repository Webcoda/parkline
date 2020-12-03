import $ from 'jquery'
import React, { useState, useRef } from 'react'
import axios from 'axios'
import Noty from 'noty'
import Richtext from '@/components/Richtext'
import SiteRecaptcha from '@/components/SiteRecaptcha'
import { axiosSureThing } from "@/utils/surething";
import serializeDataToJson from '@/utils/serializeDataToJson';

import "@/components/LinkButton.scss"
import './ContactForm.scss'


const InputBlock = ({
	inputProps,
	label,
	children
}) => {
	return (
		<label className="block">
			{ !!label && <span className="sr-only">{label}</span> }
			{
				!!children ? children : (
					<input
						className="bg-white px-4.5 py-3.5 flex-1 w-full c-contactform__input c-contactform__input-typo"
						{ ...inputProps }
					/>
				)
			}
		</label>
	)
}

const ContactForm = ({ item }) => {
	const { title, intro, endpoint } = item.customFields;
	const recaptchaRef = useRef(null);
	const [isSubmitting, setSubmitting] = useState(false);

	const onFormSubmit = async (ev) => {
		ev.preventDefault();
		setSubmitting(true)

		const el = ev.target
		const $el = $(el)

		await recaptchaRef.current.executeAsync();

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
			noty.setText(data.message, true);
			noty.setType('success', true);
			el.reset();
			recaptchaRef.current.reset();
		} else {
			noty.setText(data.message || error, true);
			noty.setType('error', true);
		}
		noty.show()
		el.focus()
		setSubmitting(false)
	}

	return (
		<form action={endpoint} onSubmit={onFormSubmit}>
			<h1 className="h2 mb-14" data-aos="fade-up">
				{title}
			</h1>

			{
				!!intro && (
					<div style={{ maxWidth: 404 }} className="mb-11" data-aos="fade-up">
						<Richtext className="font-normal" html={intro} />
					</div>
				)
			}

			<div data-aos="fade-up">
				<div className="space-y-2.5 mb-11">
					<InputBlock
						label="Name"
						inputProps={{
							type: 'text',
							name: 'name',
							placeholder: 'Name',
							required: true,
						}}
					/>
					<InputBlock
						label="Email address"
						inputProps={{
							type: 'email',
							name: 'email',
							placeholder: 'Email address',
							required: true,
						}}
					/>
					<InputBlock
						label="Company"
						inputProps={{
							type: 'text',
							name: 'company',
							placeholder: 'Company',
							required: true,
						}}
					/>
					<InputBlock label="Tell us a bit more about your enquiry">
						<textarea
							className="bg-white px-4.5 py-3.5 flex-1 w-full c-contactform__input c-contactform__input-typo"
							name="message"
							placeholder="Tell us a bit more about your enquiry"
							rows="5"
						/>
					</InputBlock>
					<label
						className="flex font-normal c-contactform__input-typo"
						style={{ marginTop: 14 }}
					>
						<input
							name="agreeprivacyterms"
							className="sr-only sibling-checked"
							type="checkbox"
							required
						/>
						<span className="w-5 h-5 inline-flex items-center justify-center bg-white sibling-checked:bg-black mr-3">
							<svg
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								focusable="false"
								aria-hidden="true"
							>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M13.7071 3.2924C14.0976 3.68293 14.0976 4.31609 13.7071 4.70662L5.70711 12.7066C5.31658 13.0971 4.68342 13.0971 4.29289 12.7066L1.29289 9.70662C0.902369 9.31609 0.902369 8.68293 1.29289 8.29241C1.68342 7.90188 2.31658 7.90188 2.70711 8.29241L5 10.5853L12.2929 3.2924C12.6834 2.90188 13.3166 2.90188 13.7071 3.2924Z"
									fill="white"
								/>
							</svg>
						</span>
						<span className="flex-1">
							I acknowledge that I have read and agree to the{' '}
							<a
								rel="noreferrer"
								className="text-inherit underline hocus:text-inherit hocus:no-underline"
								href="https://www.investa.com.au/disclaimer"
								target="_blank"
							>
								Terms &amp; Conditions
							</a>{' '}
							and{' '}
							<a
								rel="noreferrer"
								className="text-inherit underline hocus:text-inherit hocus:no-underline"
								href="https://www.investa.com.au/privacy"
								target="_blank"
							>
								Privacy policy
							</a>
							.
						</span>
					</label>
				</div>
				<button
					className="inline-block py-3 px-7 bg-yellow uppercase text-center text-inherit hocus:no-underline hocus:text-yellow hocus:bg-black transition duration-300 disabled:opacity-50 font-medium c-linkbutton"
					disabled={isSubmitting}
				>
					Submit
				</button>
			</div>
			<SiteRecaptcha propRef={recaptchaRef}></SiteRecaptcha>
		</form>
	)
}

export default ContactForm;
