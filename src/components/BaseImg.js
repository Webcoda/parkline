import React, { useEffect } from 'react';

const BaseImg = ({
	tag = 'picture',
	sources,
	src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
	alt,
	imgClassName,
	imgAttributes,
}) => {
	const Tag = tag

	const isPictureOrVideoTag =  tag === 'picture' || tag === 'video'

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
		<Tag>
			{
				isPictureOrVideoTag && (
					<>
						{sourcesWithSrcsetStr.map(source => (
							<source
								key={source.srcsetStr}
								data-srcset={source.srcsetStr}
								media={source.media}
								type={source.type}
							/>
						))}
						<img
							className={`w-full h-full object-cover js-lazysizes ${imgClassName}`}
							data-sizes="auto"
							data-src={src}
							alt={alt}
							{...imgAttributes}
						/>
					</>
				)
			}
		</Tag>
	)
}

export default BaseImg;
