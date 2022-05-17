import { CreateSlipInput } from '@/application/controllers/input/create-slip.input';
import { FindSlipInput } from '@/application/controllers/input/find-slip.input';
import { SlipController } from '@/application/controllers/slip.controller';
import { BarcodeFactory } from '@/application/factories/barcode.factory';
import { Validator } from '@/application/ports/validator.port';
import { AgreementBarcodeService } from '@/application/services/agreement-barcode.service';
import { SlipServiceImpl } from '@/application/services/slip.service';
import { TitleBarCodeService } from '@/application/services/title-barcode.service';
import { SlipRepository } from '@/domain/repositories/slip.repository';
import { SlipService } from '@/domain/services/slip.service';
import { ClassValidatorAdapter } from '@/infra/adapters/class-validator.adapter';
import { createMock } from 'ts-auto-mock';

describe(SlipController.name.toString(), () => {
    let controller: SlipController;
    let service: SlipService;
    let validator: Validator;
    let repository: SlipRepository;
    let barCodeFactory: BarcodeFactory;
    beforeEach(() => {
        barCodeFactory = new BarcodeFactory([
            new TitleBarCodeService(),
            new AgreementBarcodeService(),
        ]);
        repository = createMock<SlipRepository>();
        service = new SlipServiceImpl(repository, barCodeFactory);
        validator = new ClassValidatorAdapter();
        controller = new SlipController(service, validator);
    });
    describe(SlipController.prototype.create.name.toString(), () => {
        it('create a slip', async () => {
            const repositoryFindSpy = jest.spyOn(repository, 'find').mockResolvedValue(undefined);
            const repositoryCreateSpy = jest
                .spyOn(repository, 'create')
                .mockResolvedValue(undefined);
            await controller.create(
                CreateSlipInput.fromJSON(
                    JSON.stringify({
                        code: '00190500954014481606906809350314337370000000100',
                        barCode: '00190500954014481606906809350314337370000000100',
                        amount: 550,
                        expirationDate: new Date().toISOString(),
                    }),
                ),
            );
            expect(repositoryFindSpy).toBeCalled();
            expect(repositoryCreateSpy).toBeCalled();
        });
        it('find a slip', async () => {
            const repositoryFindSpy = jest.spyOn(repository, 'find').mockResolvedValue({
                code: '00190500954014481606906809350314337370000000100',
                barCode: '00190500954014481606906809350314337370000000100',
                amount: 550,
                expirationDate: new Date(),
            });
            const result = await controller.find(
                new FindSlipInput('00190500954014481606906809350314337370000000100'),
            );
            expect(result).not.toBeNull();
            expect(repositoryFindSpy).toBeCalled();
        });
    });
});
