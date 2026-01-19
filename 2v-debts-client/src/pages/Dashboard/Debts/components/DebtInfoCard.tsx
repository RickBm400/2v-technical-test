import { useDebtListActionsContext } from '@/context/ListActions.context';
import { Button, Card } from 'antd';
import StatusTag from './StatusTag';

export default function DebtInfoCard() {
  const { debtData, setOpenTimeline, setDebtData } =
    useDebtListActionsContext();
  return (
    <div className='space-y-4'>
      <Card>
        <div className='space-y-4 h-full'>
          <div id='header' className='flex justify-between'>
            <div className='font-bold text-[1.3rem] '>
              {debtData?.title ?? 'Test título'}
            </div>
            <Button
              shape='circle'
              variant='outlined'
              onClick={() => {
                setDebtData(null);
                setOpenTimeline(false);
              }}
            >
              x
            </Button>
          </div>
          <div>
            <StatusTag status={debtData?.status!} />
          </div>
          <p>
            {debtData?.description ??
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum enim commodi impedit porro quae pariatur laudantium asperiores corporis cupiditate, iusto sint laborum debitis nulla necessitatibus ipsum non repellendus architecto est.'}{' '}
          </p>
          <div>
            <div className='space-x-2'>
              <span className='font-bold'>Total debido: </span>
              <span>{debtData?.total_debt ?? 'N/A'}</span>
            </div>
            <div className='space-x-2'>
              <span className='font-bold'>Total pagado: </span>
              <span>{debtData?.total_debt ?? 'N/A'}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
