import { message } from 'antd';
import { Button, notification } from 'antd';
export const success = (mess) => {
        message.success(mess);
      };
    
export const error = (str) => {
        message.error('ERR: '+str);
      };
      
export const warning = () => {
        message.warning('This is a warning message');
      };

    
      
export  const openNotification = () => {
    notification[success]({
        message: 'Notification Title',
        description:
          'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      });
      };





