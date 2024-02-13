import { CSSProperties, useState } from 'react';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState, ArticleStateType } from '../../constants/articleProps';

import styles from './App.module.scss';

export const App = () => {
	const [fontFamily, setFontFamily] = useState<string>(defaultArticleState.fontFamilyOption.value);
	const [fontSize, setFontSize] = useState<string>(defaultArticleState.fontSizeOption.value);
	const [fontColor, setFontColor] = useState<string>(defaultArticleState.fontColor.value);
	const [backgroundColor, setBackgroundColor] = useState<string>(defaultArticleState.backgroundColor.value);
	const [contentWidth, setContentWidth] = useState<string>(defaultArticleState.contentWidth.value);

	const apply = (params: ArticleStateType) => {
		setFontFamily(params.fontFamilyOption.value);
		setFontSize(params.fontSizeOption.value);
		setFontColor(params.fontColor.value);
		setBackgroundColor(params.backgroundColor.value);
		setContentWidth(params.contentWidth.value);
	}

	return (
		<div
			className={styles.main}
			style={
				{
					'--font-family': fontFamily,
					'--font-size': fontSize,
					'--font-color': fontColor,
					'--container-width': contentWidth,
					'--bg-color': backgroundColor,
				} as CSSProperties
			}>
			<ArticleParamsForm onApply={apply}/>
			<Article />
		</div>
	);
};