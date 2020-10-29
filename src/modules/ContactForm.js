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
			<h1 className="h2 mb-18" data-aos="fade-up">
				{title}
			</h1>

			<div style={{ maxWidth: 404 }} className="mb-11" data-aos="fade-up">
				<Richtext className="font-normal" html={intro} />
			</div>

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
					<InputBlock
						label="What we can help you with?"
						inputProps={{
							type: 'text',
							name: 'help',
							placeholder: 'What we can help you with?',
							required: true,
						}}
					/>
					<InputBlock label="Tell us a bit more about your query">
						<textarea
							className="bg-white px-4.5 py-3.5 flex-1 w-full c-contactform__input c-contactform__input-typo"
							name="message"
							placeholder="Tell us a bit more about your query"
							rows="5"
						/>
					</InputBlock>
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
