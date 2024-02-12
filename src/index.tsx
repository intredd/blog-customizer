import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { OptionType, defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [fontFamily, setFontFamily] = useState<string>(defaultArticleState.fontFamilyOption.value);
	const [fontSize, setFontSize] = useState<string>(defaultArticleState.fontSizeOption.value);
	const [fontColor, setFontColor] = useState<string>(defaultArticleState.fontColor.value);
	const [backgroundColor, setBackgroundColor] = useState<string>(defaultArticleState.backgroundColor.value);
	const [contentWidth, setContentWidth] = useState<string>(defaultArticleState.contentWidth.value);

	const apply = (params: OptionType[]) => {
		const [fontFamily, fontSize, fontColor, backgroundColor, contentWidth] = params;
		setFontFamily(fontFamily.value);
		setFontSize(fontSize.value);
		setFontColor(fontColor.value);
		setBackgroundColor(backgroundColor.value);
		setContentWidth(contentWidth.value);
	}

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': fontFamily,
					'--font-size': fontSize,
					'--font-color': fontColor,
					'--container-width': contentWidth,
					'--bg-color': backgroundColor,
				} as CSSProperties
			}>
			<ArticleParamsForm OnApply={apply}/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
