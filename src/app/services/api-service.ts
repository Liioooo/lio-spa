import {Service} from "../../../spa-lib/decorators/service-decorator";

@Service()
export class ApiService {

    private data: string = 'some data';

    public setData(data: string) {
        this.data = data;
    }

    public getData(): string {
        return this.data;
    }
}