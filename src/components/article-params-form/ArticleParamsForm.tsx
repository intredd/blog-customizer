import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Text } from '../text';
import { Separator } from '../separator';
import { fontFamilyOptions, fontColors, fontSizeOptions, backgroundColors, contentWidthArr, defaultArticleState, OptionType, ArticleStateType } from 'src/constants/articleProps';
import { useState, useRef } from 'react';
import { useOutsideClose } from './hooks/useOutsideClose';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	onApply: (params:ArticleStateType) => void;
}

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [fontFamily, setFontFamily] = useState<OptionType>(defaultArticleState.fontFamilyOption);
	const [fontSize, setFontSize] = useState<OptionType>(defaultArticleState.fontSizeOption);
	const [fontColor, setFontColor] = useState<OptionType>(defaultArticleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState<OptionType>(defaultArticleState.backgroundColor);
	const [contentWidth, setContentWidth] = useState<OptionType>(defaultArticleState.contentWidth);
	const rootRef = useRef<HTMLDivElement>(null);

	const openForm = () => {
		setIsOpen(!isOpen);
	};

	useOutsideClose({
		isOpen,
		rootRef,
		onChange: setIsOpen
	})

	const changeFontFamily = (selected:OptionType) => {
		setFontFamily(selected);
	};

	const changeFontSize = (value:OptionType) => {
		setFontSize(value);
	};

	const changeFontColor = (selected:OptionType) => {
		setFontColor(selected);
	}

	const changeBackgroundColor = (selected:OptionType) => {
		setBackgroundColor(selected);
	}

	const changeContentWidth = (selected:OptionType) => {
		setContentWidth(selected);
	}

	const applyChanges = (params:ArticleStateType) => {
		props.onApply(params);
	}

	const changeToDefault = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		applyChanges({
			fontFamilyOption: defaultArticleState.fontFamilyOption,
			fontSizeOption: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth
		})
	}

	const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		applyChanges({
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth});
	}

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClick={openForm}/>
			<aside className={clsx(styles.container, {[styles.container_open]: isOpen})}>
				<form className={styles.form} onSubmit={onSubmit}>
					<Text size={31} weight={800} uppercase align='left'>Задайте параметры</Text>
					<Select selected={fontFamily} options={fontFamilyOptions} onChange={changeFontFamily} title='шрифт' />
					<RadioGroup name='fontSize' selected={fontSize} options={fontSizeOptions} onChange={changeFontSize} title='Размер шрифта'/>
					<Select selected={fontColor} options={fontColors} onChange={changeFontColor} title='Цвет шрифта' />
					<Separator />
					<Select selected={backgroundColor} options={backgroundColors} onChange={changeBackgroundColor} title='Цвет фона' />
					<Select selected={contentWidth} options={contentWidthArr} onChange={changeContentWidth} title='Ширина контента' />
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={changeToDefault}/>
						<Button title='Применить' type='submit'/>
					</div>
				</form>
			</aside>
		</div>
	);
};
