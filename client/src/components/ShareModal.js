import { useDisclosure } from '@mantine/hooks';
import { Modal, useMantineTheme } from '@mantine/core';
import '../pages/auth/Auth.css'
import PostShare from './postside/postShare/PostShare';

function ShareModal({modalOpened,setModalOpened}) {
  const [opened] = useDisclosure(false);
  const theme = useMantineTheme();

  return (
    <>
      <Modal
        opened={modalOpened}
        onClose={()=>{
            setModalOpened(false)
        }}
       
        overlayProps={{
          color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
          
        }}
        size='55%'
      >
   <PostShare/>
      </Modal>

    
    </>
  );
}

export default ShareModal;