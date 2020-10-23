import $ from 'jquery'
import Loadable from '@loadable/component'
import React, { useState, useRef } from 'react'
import axios from 'axios'
import Noty from 'noty'
import Richtext from '@/components/Richtext'
import "@/components/LinkButton.scss"
import { axiosSureThing } from "@/utils/surething";

import './ContactForm.scss'

const Recaptcha = Loadable(() => import('react-google-recaptcha'))

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

const getFormData = ($form) => {
	const unindexed_array = $form.serializeArray()
	const indexed_array = {}

	$.map(unindexed_array, function(n, i) {
		indexed_array[n['name']] = n['value']
	})

	return indexed_array
}

const ContactForm = ({ item }) => {
	const { title, intro, recaptchaSiteKey, endpoint } = item.customFields;
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
					...getFormData($el),
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
			<h1 className="h2 mb-18">{title}</h1>

			<div style={{ maxWidth: 404 }} className="mb-11">
				<Richtext className="font-normal" html={intro} />
			</div>

			<div className="space-y-2.5 mb-11">
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
				className="inline-flex py-3 px-7 bg-yellow uppercase text-inherit hocus:no-underline hocus:text-yellow hocus:bg-black transition duration-300 disabled:opacity-50 font-medium c-linkbutton"
				disabled={isSubmitting}
			>
				Submit
			</button>
			<Recaptcha
				ref={recaptchaRef}
				size="invisible"
				sitekey={recaptchaSiteKey}
				tabindex={-1}
			></Recaptcha>
		</form>
	)
}

export default ContactForm;
