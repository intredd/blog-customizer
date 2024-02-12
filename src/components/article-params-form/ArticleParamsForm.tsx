import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Text } from '../text';
import { Separator } from '../separator';
import { fontFamilyOptions, fontColors, fontSizeOptions, backgroundColors, contentWidthArr, defaultArticleState, OptionType } from 'src/constants/articleProps';
import { useState, useRef } from 'react';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	OnApply: (params:OptionType[]) => void;
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

	useOutsideClickClose({
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

	const applyChanges = (params:OptionType[]) => {
		props.OnApply(params);
	}

	const changeToDefault = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		applyChanges([
			defaultArticleState.fontFamilyOption,
			defaultArticleState.fontSizeOption,
			defaultArticleState.fontColor,
			defaultArticleState.backgroundColor,
			defaultArticleState.contentWidth
		])
	}

	const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		applyChanges([fontFamily, fontSize, fontColor, backgroundColor, contentWidth]);
	}

	return (
		<>
			<div ref={rootRef}>
				<ArrowButton isOpen={isOpen} onClick={openForm}/>
				<aside className={`${styles.container} ${isOpen ? styles.container_open : ''}`}>
					<form className={styles.form} onSubmit={onSubmit}>
						<Text size={31} weight={800} uppercase align='left'>Задайте параметры</Text>
						<Select selected={fontFamily} options={fontFamilyOptions} onChange={changeFontFamily} title='шрифт' />
						<RadioGroup name='fontSize' selected={fontSize} options={fontSizeOptions} onChange={changeFontSize} title='Размер шрифта'/>
						<Select selected={fontColor} options={fontColors} onChange={changeFontColor} title='Цвет шрифта' />
						<Separator />
						<Select selected={backgroundColor} options={backgroundColors} onChange={changeBackgroundColor} title='Цвет фона' />
						<Select selected={contentWidth} options={contentWidthArr} onChange={changeContentWidth} title='Цвет фона' />
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' type='reset' onClick={changeToDefault}/>
							<Button title='Применить' type='submit'/>
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
