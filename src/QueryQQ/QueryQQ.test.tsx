import { render as renderDom, unmountComponentAtNode } from "react-dom"
import { act } from "react-dom/test-utils"
import QueryQQ from "./QueryQQ"
import axios from 'axios';
import { cleanup, render, fireEvent } from '@testing-library/react';

jest.mock('axios');
jest.useFakeTimers();

let container: any = null
describe('test QueryQQ', () => {
  beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
  })

  afterEach(cleanup);

  afterEach(() => {
    unmountComponentAtNode(container)
    container.remove()
    container = null;
    (axios.get as jest.Mock).mockReset();
  })



  it("render if has content", () => {
    renderDom(<QueryQQ />, container)
    expect(container.textContent).toBe("QQ号查询QQ")
  })

  it("render query qq", async () => {
    const { getByTestId } = render(<QueryQQ />);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const textInput = getByTestId('textInput');

    const fireChange = (text: string) =>
      fireEvent.change(textInput, {
        target: {
          value: text,
        },
      });
    act(() => {
      fireChange('1');
      fireChange('2');
    });

    act(() => {
      fireChange('12121');
    });
    act(() => {
      fireChange('121212');
    });
    // @ts-ignore
    axios.get.mockImplementation(() => Promise.resolve({ data: {} }));
    expect(axios.get).not.toBeCalled();
    jest.runAllTimers();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toBeCalledWith('https://api.uomg.com/api/qq.info?qq=121212');
  })
})