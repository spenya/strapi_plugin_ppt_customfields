import {
	prefixPluginTranslations
} from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';
import InputDurationIcon from './components/InputDurationIcon';
import InputMultiBooleanIcon from './components/InputMultiBooleanIcon';

const name = pluginPkg.strapi.name;

export default {
	register(app) {


		app.customFields.register({
			name: "multiboolean",
			pluginId: "ppt-customfields",
			icon: InputMultiBooleanIcon,
			type: "json",
			intlLabel: {
				id: "ppt-customfields.multiboolean.label",
				defaultMessage: "MultiBoolean",
			},
			intlDescription: {
				id: "ppt-customfields.multiboolean.description",
				defaultMessage: "Custom field for multiple boolean selection",
			},
			components: {
				Input: async () => import( /* webpackChunkName: "input-component" */ "./components/InputMultiBoolean"),
			},
			options: {
				base: [{
						name: 'options.onText',
						type: 'string',
						intlLabel: {
							id: 'ppt-customfields.multiboolean.on-text-title',
							defaultMessage: 'On text',
						},
						description: {
							id: 'ppt-customfields.multiboolean.on-text-description',
							defaultMessage: 'Enter one option per line.',
						},
						placeholder: {
							id: 'ppt-customfields.multiboolean.on-text-example',
							defaultMessage: 'Yes',
						},
					},
					{
						name: 'options.offText',
						type: 'string',
						intlLabel: {
							id: 'ppt-customfields.multiboolean.off-text-title',
							defaultMessage: 'Off text',
						},
						description: {
							id: 'ppt-customfields.multiboolean.off-text-description',
							defaultMessage: 'Enter one option per line.',
						},
						placeholder: {
							id: 'ppt-customfields.multiboolean.off-text-example',
							defaultMessage: 'No',
						},
					},
					{
						sectionTitle: null,
						items: [{
							name: 'options.list',
							type: 'textarea-enum',
							intlLabel: {
								id: 'ppt-customfields.multiboolean.options-title',
								defaultMessage: 'Options (one per line)',
							},
							description: {
								id: 'ppt-customfields.multiboolean.options-description',
								defaultMessage: 'Enter one option per line.',
							},
							placeholder: {
								id: 'ppt-customfields.multiboolean.options-example',
								defaultMessage: 'Ex:\nOption 1\nOption 2\nOption 3:option-3',
							},
						}]
					}
				]
			}
		});

		app.customFields.register({
			name: "duration",
			pluginId: "ppt-customfields",
			type: "integer",
			intlLabel: {
				id: "ppt-customfields.duration.label",
				defaultMessage: "Duration",
			},
			intlDescription: {
				id: "ppt-customfields.duration.description",
				defaultMessage: "Custom field for time duration",
			},
			icon: InputDurationIcon,
			components: {
				Input: async () => import( /* webpackChunkName: "input-component" */ "./components/InputDuration"),
			},
			options: {advanced: [{
						name: 'options.withSeconds',
						type: 'checkbox',
						intlLabel: {
							id: 'ppt-customfields.duration.has-seconds-title',
							defaultMessage: 'With seconds field.',
						},
						description: {
							id: 'ppt-customfields.duration.has-seconds-description',
							defaultMessage: 'True or false',
						},
						
					}]}

		});


		app.registerPlugin({
			id: pluginId,
			initializer: Initializer,
			isReady: false,
			name,
		});
	},

	bootstrap(app) {},


	async registerTrads({
		locales
	}) {
		const importedTrads = await Promise.all(
			locales.map((locale) => {
				return import(
						/* webpackChunkName: "translation-[request]" */
						`./translations/${locale}.json`
					)
					.then(({
						default: data
					}) => {
						return {
							data: prefixPluginTranslations(data, pluginId),
							locale,
						};
					})
					.catch(() => {
						return {
							data: {},
							locale,
						};
					});
			})
		);

		return Promise.resolve(importedTrads);
	},
};