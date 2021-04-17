//
// main.ts — Compendium Import File
// ~/src
//

import { Utility } from './utility';

export {}

Hooks.on<Hooks.GetCompendiumDirectoryEntryContext>(
	'getCompendiumDirectoryEntryContext',
	(html, options) => {
		const newOptions: ContextMenu.Item[] = [
			{
				name: 'COMPENDIUM.ImportFromFile',
				icon: '<i class="fas fa-upload"></i>',
				callback: (li) => {
					const pack = game.packs.get(li.data('pack'));
					const content = `<form>
						<div class="form-group">
							<label>${game.i18n.localize('COMPENDIUM.ImportFile')}</label>
							<input type="file" name="importFile" />
							<p class="notes">${game.i18n.localize('COMPENDIUM.ImportFromFileHint')}</p>
						</div>
					</form>`;

					return Dialog.confirm({
						title: `${game.i18n.localize("COMPENDIUM.ImportFromFile")}: ${pack.title}`,
						content,
						options: {
							top: Math.min(li[0].offsetTop, window.innerHeight - 350),
							left: window.innerWidth - 720,
							width: 400,
							jQuery: false
						},
						yes: (html) => {
							const input = html.querySelector<HTMLInputElement>('input[name="importFile"]');
							Utility.importFile(pack, input.files.item(0));
						},
					})
				},
			},

			{
				name: 'COMPENDIUM.ExportIntoFile',
				icon: '<i class="fas fa-download"></i>',
				callback: (li) => {
					const pack = game.packs.get(li.data('pack'));
					Utility.exportFile(pack);
				},
			},
		];

		const index = options.findIndex((option) => option.name === 'COMPENDIUM.ImportAll');
		if (index === -1) {
			options.push(...newOptions);
		} else {
			options.splice(index + 1, 0, ...newOptions);
		}
	},
);
