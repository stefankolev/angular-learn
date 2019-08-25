import { ReversePipe } from "./reverse.pipe";

describe('AppComponent', () => {

    it('should test the pipe', () => {
        let reversePipe = new ReversePipe();
        expect(reversePipe.transform('hello')).toEqual('olleh');
    });
});
