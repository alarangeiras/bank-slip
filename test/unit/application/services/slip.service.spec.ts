import { BarcodeFactory } from '@/application/factories/barcode.factory';
import { SlipServiceImpl } from '@/application/services/slip.service';
import { SlipRepository } from '@/domain/repositories/slip.repository';

describe(SlipServiceImpl.name.toString(), () => {
    let slipService: SlipServiceImpl;
    let slipRepository: SlipRepository;
    let barcodeFactory: BarcodeFactory;
    beforeEach(() => {
        slipRepository = {} as any as SlipRepository;
        barcodeFactory = new BarcodeFactory([]);
        slipService = new SlipServiceImpl(slipRepository, barcodeFactory);
    });
    describe(SlipServiceImpl.prototype.create.name.toString(), () => {
        test('should create a slip', async () => {
            const barcodeFactoryBuildSpy = jest
                .spyOn(barcodeFactory, 'build')
                .mockResolvedValue(undefined as any);
            const slipRepositoryFindSpy = jest.fn().mockResolvedValue(undefined);
            const slipRepositoryCreateSpy = jest.fn().mockResolvedValue(undefined);
            slipRepository.find = slipRepositoryFindSpy;
            slipRepository.create = slipRepositoryCreateSpy;

            await slipService.create({
                code: '12314142',
                barCode: '1213123',
                amount: 200,
                expirationDate: new Date(),
            });

            expect(barcodeFactoryBuildSpy).toBeCalledTimes(1);
            expect(slipRepositoryFindSpy).toBeCalledTimes(1);
            expect(slipRepositoryCreateSpy).toBeCalledTimes(1);
        });
        test('slip should already exists', async () => {
            const barcodeFactoryBuildSpy = jest
                .spyOn(barcodeFactory, 'build')
                .mockResolvedValue(undefined as any);
            const slipRepositoryFindSpy = jest.fn().mockResolvedValue({
                code: '1234',
                amount: 200,
                expirationDate: new Date(),
            });
            slipRepository.find = slipRepositoryFindSpy;

            try {
                await slipService.create({
                    code: '12314142',
                    barCode: '1213123',
                    amount: 200,
                    expirationDate: new Date(),
                });
            } catch (error) {
                expect(barcodeFactoryBuildSpy).toBeCalledTimes(1);
                expect(slipRepositoryFindSpy).toBeCalledTimes(1);
                return;
            }

            throw new Error('should not reach this point');
        });
    });
    describe(SlipServiceImpl.prototype.find.name.toString(), () => {
        test('find a slip', async () => {
            const barcodeFactoryBuildSpy = jest
                .spyOn(barcodeFactory, 'build')
                .mockResolvedValue(undefined as any);
            const slipRepositoryFindSpy = jest.fn().mockResolvedValue({
                code: '1234',
            });
            slipRepository.find = slipRepositoryFindSpy;

            const result = await slipService.find('1234');
            expect(result).not.toBeNull();
            expect(barcodeFactoryBuildSpy).toBeCalledTimes(1);
            expect(slipRepositoryFindSpy).toBeCalledTimes(1);
        });
        test('could not find a slip', async () => {
            const barcodeFactoryBuildSpy = jest
                .spyOn(barcodeFactory, 'build')
                .mockResolvedValue(undefined as any);
            const slipRepositoryFindSpy = jest.fn().mockResolvedValue(undefined);
            const slipRepositoryCreateSpy = jest.fn().mockResolvedValue(undefined);
            slipRepository.find = slipRepositoryFindSpy;
            slipRepository.create = slipRepositoryCreateSpy;

            try {
                await slipService.find('1234');
            } catch (error) {
                expect(barcodeFactoryBuildSpy).toBeCalledTimes(1);
                expect(slipRepositoryFindSpy).toBeCalledTimes(1);
                return;
            }
            throw new Error('should not reach this point');
        });
    });
});
