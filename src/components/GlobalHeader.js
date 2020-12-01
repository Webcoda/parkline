import React, { useRef, useEffect } from 'react';
import { graphql, StaticQuery } from "gatsby"
import Headroom from 'headroom.js'
import encodeUrl from 'encodeurl'

import Link from '@/components/Link'
import CommonContainer from '@/components/CommonContainer';

import './GlobalHeader.scss'

export default props => (
	<StaticQuery
		query={graphql`
			query GlobalHeaderQuery {
				agilityGlobalHeader(
					properties: { referenceName: { eq: "globalheader" } }
				) {
					customFields {
						siteName
						logo {
							url
							filesize
							pixelHeight
							pixelWidth
						}
						contactLink {
							href
							text
							target
						}
					}
				}
				allAgilitySitemapNode {
					nodes {
						languageCode
						path
						menuText
						pageID
					}
				}
			}
		`}
		render={queryData => {
			const viewModel = {
				item: queryData.agilityGlobalHeader,
				menuLinks: queryData.allAgilitySitemapNode.nodes.filter(
					sitemapNode => {
						let isTopLevelPage =
							sitemapNode.path.split('/').length === 2
						const isThisLanguage =
							sitemapNode.languageCode === props.languageCode
						if (props.isMultiLanguage) {
							isTopLevelPage =
								sitemapNode.path.split('/').length === 3
						}
						//only return nodes from this language and top level links only
						return isThisLanguage && isTopLevelPage
					}
				),
			}
			return <GlobalHeader {...viewModel} />
		}}
	/>
)

const GlobalHeader = ({ item, menuLinks }) => {
	const headerRef = useRef(null)

	const renderLinks = () => {
		return menuLinks
			.filter(node => node.path !== '/' && node.path !== '/home')
			.map(node => (
				<div className="md:-mb-2 c-header__menu-item" key={node.pageID}>
					<Link
						to={node.path}
						className="inline-flex flex-col text-inherit hocus:text-inherit hover:no-underline px-7 md:pb-2 b-fsnav group relative overflow-hidden c-header__menu-link"
						activeClassName="active"
					>
						{node.menuText}
						<div className="hidden md:block -translate-x-full bg-yellow transition duration-300 absolute left-0 h-1 bottom-0 w-full group-active:translate-x-0 group-hover:translate-x-0"></div>
					</Link>
				</div>
			))
	}

	useEffect(() => {
		const $header = headerRef.current;
		const headroom = new Headroom($header, {
			classes: {
				pinned: 'is-pinned',
				unpinned: 'is-unpinned',
				top: 'is-top',
				bottom: 'is-bottom',
				notTop: 'is-not-top',
				notBottom: 'is-not-bottom',
			},
			offset: 135,
			onTop() {
				$header.classList.remove('has-transition')
			},
			onNotTop() {
				setTimeout(() => {
					if (!$header.classList.contains('has-transition')) {
						$header.classList.add('has-transition')
					}
				}, 0)
			},
		})
		headroom.init()
	}, [])

	const handleClickHamburger = (ev) => {
		const { currentTarget } = ev;
		currentTarget.classList.toggle('is-active')
		const $html = document.querySelector('html');
		if($html) {
			$html.classList.toggle('is-menu-active');
		}
	}

	return (
		<header className="c-header" ref={headerRef}>
			<div className="fixed top-0 left-0 w-full z-10">
				<div className="relative z-10 bg-yellow text-text">
					<div className="container-fluid">
						<div className="row">
							<div className="col md:offset-1 py-4 flex items-center justify-between">
								<Link
									to="/"
									className="relative"
									title={item.customFields.siteName}
								>
									<img
										alt="Logo"
										src={encodeUrl(
											item.customFields.logo.url
										)}
										className="c-header__logo-main transition duration-300"
									/>
									<svg
										width="32"
										height="39"
										viewBox="0 0 32 39"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										className="absolute top-0 left-0 opacity-0 c-header__logo-notontop transition duration-300"
										aria-hidden="true"
										focusable="false"
									>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M31.6509 14.1053C31.6509 6.32795 25.2686 0 17.4238 0H11.6971V4.39302H17.4238C22.8249 4.39302 27.2197 8.75006 27.2197 14.1053C27.2197 19.4605 22.8249 23.8175 17.4238 23.8175H11.6971V28.2106H17.4238C25.2686 28.2106 31.6509 21.8832 31.6509 14.1053ZM6.19256 38.7609H10.3209V0.000553735L6.19256 0V38.7609ZM0 38.7609H4.12838V0.000553727L0 0V38.7609ZM17.4277 6.19345L11.6971 6.19291V22.2477L17.4277 22.2472C21.8585 22.2085 25.4583 18.6073 25.4583 14.2203C25.4583 9.83332 21.8585 6.23209 17.4277 6.19345Z"
											fill="black"
										/>
									</svg>
								</Link>
								<button
									className="md:hidden hamburger hamburger--elastic"
									type="button"
									onClick={handleClickHamburger}
								>
									<span className="hamburger-box">
										<span className="hamburger-inner"></span>
									</span>
								</button>
								{/* <a
									href="tel:1300 123 456"
									className="hidden md:inline-flex items-center space-x-4 b-fsregular text-inherit hocus:text-inherit"
								>
									<svg
										width="31"
										height="30"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											clipRule="evenodd"
											d="M30 15c0 8.008-6.492 14.5-14.5 14.5S1 23.008 1 15 7.492.5 15.5.5 30 6.992 30 15z"
											stroke="currentColor"
											strokeLinecap="round"
										/>
										<path
											clipRule="evenodd"
											d="M11.813 18.96c4.216 4.215 9.213 5.1 10.87 5.01a20.889 20.889 0 002.483-4.352c-.956-1.165-3.526-2.458-4.713-2.76l-1.583 1.65c-.72-.216-2.31-.66-4.128-2.478-1.817-1.818-2.221-3.368-2.436-4.087l1.608-1.624c-.5-1.713-1.711-3.573-2.76-4.713A20.889 20.889 0 006.802 8.09c-.09 1.658.795 6.654 5.01 10.87z"
											stroke="currentColor"
											strokeLinecap="round"
										/>
									</svg>
									<span>1300 123 456</span>
								</a> */}
							</div>
							{/* {!!item.customFields.contactLink?.href && (
								<div className="hidden md:block col-auto text-white">
									<Link
										to={item.customFields.contactLink.href}
										target={
											item.customFields.contactLink.target
										}
										className="inline-flex relative overflow-hidden bg-black text-inherit hocus:no-underline hocus:text-inherit py-6 px-13.5 -mr-2.5 font-medium group"
									>
										<span className="inline-flex items-center space-x-4">
											<svg
												width="36"
												height="26"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													clipRule="evenodd"
													d="M35.06 23.452c0 .855-.693 1.548-1.548 1.548H2.549A1.549 1.549 0 011 23.452V2.549C1 1.693 1.694 1 2.549 1h30.963c.855 0 1.548.693 1.548 1.549v20.903z"
													stroke="currentColor"
												/>
												<path
													d="M33.092 3.675a.5.5 0 00-.707-.707l.707.707zM21.862 14.2l-.354-.353.354.353zm-7.663 0l.353-.353-.353.353zM4.449 3.742a.5.5 0 00-.707.707l.707-.707zM3.742 21.55a.5.5 0 10.707.707l-.707-.707zm7.674-6.261a.5.5 0 00-.707-.707l.707.707zm20.195 6.968a.5.5 0 00.707-.707l-.707.707zm-6.26-7.675a.5.5 0 00-.707.707l.707-.707zm7.034-11.615L21.508 13.847l.707.707 10.877-10.88-.707-.706zM21.508 13.847a4.917 4.917 0 01-6.956 0l-.707.707a5.917 5.917 0 008.37 0l-.707-.707zm-6.956 0L4.45 3.742l-.707.707 10.103 10.105.707-.707zM4.45 22.257l6.967-6.967-.707-.707-6.967 6.968.707.707zm27.87-.706l-6.968-6.968-.707.707 6.967 6.968.707-.707z"
													fill="currentColor"
												/>
											</svg>
											<span>
												{
													item.customFields
														.contactLink.text
												}
											</span>
										</span>
										<span
											className="absolute inset-0 flex flex-col translate-y-full group-hocus:translate-y-0 transition duration-500 overflow-hidden"
											aria-hidden="true"
										>
											<span
												className={`flex-1 py-6 px-13.5 inline-flex items-center space-x-4 -translate-y-full group-hocus:translate-y-0 transition duration-500 bg-grey-light text-black`}
											>
												<svg
													width="36"
													height="26"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														clipRule="evenodd"
														d="M35.06 23.452c0 .855-.693 1.548-1.548 1.548H2.549A1.549 1.549 0 011 23.452V2.549C1 1.693 1.694 1 2.549 1h30.963c.855 0 1.548.693 1.548 1.549v20.903z"
														stroke="currentColor"
													/>
													<path
														d="M33.092 3.675a.5.5 0 00-.707-.707l.707.707zM21.862 14.2l-.354-.353.354.353zm-7.663 0l.353-.353-.353.353zM4.449 3.742a.5.5 0 00-.707.707l.707-.707zM3.742 21.55a.5.5 0 10.707.707l-.707-.707zm7.674-6.261a.5.5 0 00-.707-.707l.707.707zm20.195 6.968a.5.5 0 00.707-.707l-.707.707zm-6.26-7.675a.5.5 0 00-.707.707l.707-.707zm7.034-11.615L21.508 13.847l.707.707 10.877-10.88-.707-.706zM21.508 13.847a4.917 4.917 0 01-6.956 0l-.707.707a5.917 5.917 0 008.37 0l-.707-.707zm-6.956 0L4.45 3.742l-.707.707 10.103 10.105.707-.707zM4.45 22.257l6.967-6.967-.707-.707-6.967 6.968.707.707zm27.87-.706l-6.968-6.968-.707.707 6.967 6.968.707-.707z"
														fill="currentColor"
													/>
												</svg>
												<span>
													{
														item.customFields
															.contactLink.text
													}
												</span>
											</span>
										</span>
									</Link>
								</div>
							)} */}
							<div className="hidden md:block col-auto text-white">
								<a
									href="tel:02 8226 9300"
									className="inline-flex relative overflow-hidden bg-black text-inherit hocus:no-underline hocus:text-inherit py-6 px-13.5 -mr-2.5 font-medium group"
								>
									<span className="inline-flex items-center space-x-4">
										<svg
											width="31"
											height="30"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												clipRule="evenodd"
												d="M30 15c0 8.008-6.492 14.5-14.5 14.5S1 23.008 1 15 7.492.5 15.5.5 30 6.992 30 15z"
												stroke="currentColor"
												strokeLinecap="round"
											/>
											<path
												clipRule="evenodd"
												d="M11.813 18.96c4.216 4.215 9.213 5.1 10.87 5.01a20.889 20.889 0 002.483-4.352c-.956-1.165-3.526-2.458-4.713-2.76l-1.583 1.65c-.72-.216-2.31-.66-4.128-2.478-1.817-1.818-2.221-3.368-2.436-4.087l1.608-1.624c-.5-1.713-1.711-3.573-2.76-4.713A20.889 20.889 0 006.802 8.09c-.09 1.658.795 6.654 5.01 10.87z"
												stroke="currentColor"
												strokeLinecap="round"
											/>
										</svg>
										<span>02 8226 9300</span>
									</span>
									<span
										className="absolute inset-0 flex flex-col translate-y-full group-hocus:translate-y-0 transition duration-500 overflow-hidden"
										aria-hidden="true"
									>
										<span
											className={`flex-1 py-6 px-13.5 inline-flex items-center space-x-4 -translate-y-full group-hocus:translate-y-0 transition duration-500 bg-grey-light text-black`}
										>
											<svg
												width="31"
												height="30"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													clipRule="evenodd"
													d="M30 15c0 8.008-6.492 14.5-14.5 14.5S1 23.008 1 15 7.492.5 15.5.5 30 6.992 30 15z"
													stroke="currentColor"
													strokeLinecap="round"
												/>
												<path
													clipRule="evenodd"
													d="M11.813 18.96c4.216 4.215 9.213 5.1 10.87 5.01a20.889 20.889 0 002.483-4.352c-.956-1.165-3.526-2.458-4.713-2.76l-1.583 1.65c-.72-.216-2.31-.66-4.128-2.478-1.817-1.818-2.221-3.368-2.436-4.087l1.608-1.624c-.5-1.713-1.711-3.573-2.76-4.713A20.889 20.889 0 006.802 8.09c-.09 1.658.795 6.654 5.01 10.87z"
													stroke="currentColor"
													strokeLinecap="round"
												/>
											</svg>
											<span>02 8226 9300</span>
										</span>
									</span>
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="absolute left-0 w-full md:relative bg-white c-header__menu -translate-y-full md:translate-y-0 transition duration-300">
					<div className="hidden md:block border-b-4 absolute bottom-0 inset-x-0 bg-grey-light"></div>
					<CommonContainer className="pt-6 pb-7.5 md:pt-4 md:pb-2 relative">
						<nav className="md:flex justify-between text-center md:text-left md:-mx-7 space-y-5.5 md:space-y-0 c-header__menu-inner">
							{renderLinks()}
						</nav>
					</CommonContainer>
				</div>
			</div>
		</header>
	)
}


