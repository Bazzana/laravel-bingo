import { Button, ButtonGroup } from "@chakra-ui/react";

function ShareButton({onShareURL}) {

  function passURLToParent() {
    onShareURL(window.location.href)
  }

  return (
        <Button onClick={passURLToParent}>
            Share your progress
        </Button>
    );

}
export default ShareButton;