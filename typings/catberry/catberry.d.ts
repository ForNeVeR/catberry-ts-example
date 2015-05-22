declare module 'catberry' {
	interface ILocator {
	}

	interface IApplication {
		locator: ILocator;

		startWhenReady(): void;
	}

	export function create(config: any): IApplication;
}
