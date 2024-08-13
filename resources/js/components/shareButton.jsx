import { Button } from "@chakra-ui/react";


function ShareButton({onShareURL}) {

  function passURLToParent() {
    onShareURL(window.location.href)
  }

  return (
    <Button h='80%' size='sm' mr=".3rem" onClick={passURLToParent}>
        Share your progress
    </Button>
    );
    
}
export default ShareButton;