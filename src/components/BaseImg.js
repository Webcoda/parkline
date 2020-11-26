import React, { useEffect } from 'react'
import './BaseImg.scss'

const BaseImg = ({
	tag = 'picture',
	sources,
	src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
	alt,
	imgClassName,
	imgAttributes,
}) => {
	const Tag = sources.length === 1 ? 'div' : tag

	const isPictureOrVideoTag = tag === 'picture' || tag === 'video'

	const sourcesWithSrcsetStr = sources.map(source => ({
		...source,
		srcsetStr: source.srcset
			.map(srcset => ({
				...srcset,
				srcsetStr: `${srcset.src} ${srcset.descriptor}`.trim(),
			}))
			.map(item => item.srcsetStr)
			.join(','),
	}))

	useEffect(() => {
		/* eslint-disable */
		import('@/utils/lazysizes')
	}, [])

	return (
		<Tag className="relative w-full h-full overflow-hidden inline-block">
			{isPictureOrVideoTag && (
				<>
					{sources.length > 1 &&
						sourcesWithSrcsetStr.map(source => (
							<source
								key={source.srcsetStr}
								data-srcset={source.srcsetStr}
								media={source.media}
								type={source.type}
							/>
						))}
					<img
						src={src}
						className={`w-full h-full object-cover js-lazysizes ${imgClassName}`}
						data-sizes="auto"
						data-srcset={
							sources.length === 1
								? sourcesWithSrcsetStr[0].srcsetStr
								: undefined
						}
						alt={alt}
						{...imgAttributes}
					/>
				</>
			)}
			<img
				className="BaseImg__lqip u-embed__item pointer-events-none transition duration-500"
				src={src}
				alt=""
				aria-hidden="true"
			/>
		</Tag>
	)
}

export default BaseImg
