import {Service} from '../../../../packages/lio-spa/src/decorators/service-decorator';

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