import { Module } from '@nestjs/common';
import { PaymentsController } from './controllers/payments/payments.controller';
import { PaymentsService } from './services/payments/payments.service';

@Module({
  controllers: [PaymentsController],
  providers: [{
    provide: "PAYMENT_SERVICE",
    useClass: PaymentsService
  }]
})
export class PaymentsModule {}
