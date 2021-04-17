//
// utility.ts — Compendium Import File
// ~/src
//

export class Utility {
	/**
	 * Import file content into a compendium
	 */
	static importFile(pack: Compendium, file: File): Promise<Entity[]> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.addEventListener('load', async (event) => {
				const content = event.target.result.toString();

				try {
					const datas = content
						.split('\n')
						.map((line, index) => {
							if (!line) {
								return null;
							}

							const data = JSON.parse(line);
							if (!data || data.constructor !== Object) {
								throw new Error(`Invalid data on line ${index + 1}`);
							}

							return data;
						})
						.filter((data) => data);

					const result = await pack.createEntity(datas);
					resolve(result as Entity[]);
				} catch (error) {
					reject(error);
				}
			});

			reader.addEventListener('error', () => reject(new Error('An error occured while reading the file')));
			reader.readAsText(file);
		});
	}

	/**
	 * Export compendium into a file to download
	 */
	static async exportFile(pack: Compendium): Promise<void> {
		const entities = await pack.getContent();
		const content = entities.map((entity) => JSON.stringify(entity.data)).join('\n');

		const blob = new Blob([content], { type: 'application/json; charset=utf-8' });
		const url = URL.createObjectURL(blob);

		const a = document.createElement('a');
		a.setAttribute('download', pack.metadata.name + '.db');
		a.setAttribute('href', url);

		a.click();
		setTimeout(() => URL.revokeObjectURL(url), 1000);
	}
}
