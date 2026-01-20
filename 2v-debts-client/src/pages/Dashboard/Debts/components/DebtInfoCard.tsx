import { useDebtListActionsContext } from '@/context/ListActions.context';
import { Button, Card, Form } from 'antd';
import StatusTag from './StatusTag';
import type { User } from '@/types/users.types';

export default function DebtInfoCard() {
  const { debtListData, setOpenTimeline, setdebtListData } =
    useDebtListActionsContext();
  return (
    <div className='h-full'>
      <Card
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        styles={{
          body: {
            height: '100%',
          },
        }}
      >
        <div className='space-y-4 h-full'>
          <div id='header' className='flex justify-between'>
            <div className='font-bold text-[1.3rem] '>
              {debtListData?.title ?? 'Test título'}
            </div>
            <Button
              shape='circle'
              variant='outlined'
              onClick={() => {
                setdebtListData(null);
                setOpenTimeline(false);
              }}
            >
              x
            </Button>
          </div>
          <div>
            <StatusTag status={debtListData?.status!} />
          </div>
          <p>
            <span className='font-bold'>Descripción: </span>
            {debtListData?.description ?? 'N/A'}
          </p>
          <div>
            <div className='space-x-2'>
              <span className='font-bold'>Total debido: </span>
              <span>{debtListData?.total_debt ?? 'N/A'}</span>
            </div>
            <div className='space-x-2'>
              <span className='font-bold'>Total pagado: </span>
              <span>{debtListData?.total_debt ?? 'N/A'}</span>
            </div>
            <div className='space-x-2'>
              <span className='font-bold'>Deudor: </span>
              <span>{(debtListData?.debtor as User)?.email ?? 'N/A'}</span>
            </div>
          </div>
        </div>
        <div className='mt-auto'>
          <Form>
            <Form.Item></Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
}
