import React from 'react';
import formatDate from 'date-fns/format'

import Richtext from '@/components/Richtext'
import './ArticleDetail.scss'

const ArticleDetail = ({ item, dynamicPageItem }) => {
	const article = dynamicPageItem;
	const { title, media, details, articleType, date } = article.customFields

    return (
		<article>
			{/* Slider */}
			<h1>{title}</h1>
			{media && (
				<img src={media.url + '?w=860'} alt="" />
			)}

			<div className="mt-30 container-fluid">
				<div className="row">
					<div className="md:offset-1 md:col-8">
						<Richtext
							className="font-normal c-article-detail__text"
							html={details}
						/>
					</div>
					<div className="md:col-2">
						<div
							className="border-t border-b py-3.5"
							style={{ borderColor: '#1e1e1e' }}
						>
							<div className="mb-6 c-article-detail__meta">
								{
									articleType
										?.customFields.title
								}{' '}
								| {formatDate(new Date(date), 'd MMM yyyy')}
							</div>
							<div className="font-bold c-article-detail__author">
								By <strong className="underline ">Jonathan Bruns</strong> and
								<strong className="underline ">Maggie Martine</strong>
							</div>
						</div>
					</div>
				</div>
			</div>
		</article>
	)
}
export default ArticleDetail;
