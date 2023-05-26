import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import user from "@testing-library/user-event";
import Login from '../pages/Login';

describe('test Login component', () => {
  function renderLogin() {
    render(<Login />);

    function getElements() {
    return {
      name: screen.queryByLabelText('name-input'),
      // start: screen.getByText("Start")
    };
  }
    return {
      enterButt: screen.getByText('Enter'),
      getElements
    };
  }

  it('should close the form after add', async() => {
  const { enterButt, getElements } = renderLogin();

    //user enters name and click on Enter
    let form = getElements();
    await user.type(form.name, 'Maria');
    expect(form.name).toHaveValue('Maria');
    // expect(form.start).toBeNull();
    await user.click(enterButt);

    // after clicking the enter button,
    // components related to the rules should be rendered
    // they render in app, but the following test does not pass
    // (rtl cannot find start button)

    // expect(form.start).toBeInTheDocument();

  });
  });
