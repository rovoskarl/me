import {ThemeProvider} from '@material-ui/core/styles';
import Enzyme, {mount, render, shallow} from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import theme from '~/themes/mui';

import {
    Button,
    Grid,
    Icon,
    Navigation,
    Root,
    Slider,
    Typography,
} from '../core/adapters/atoms';
import AtomPane from '../core/atomPane';

import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

const ButtonSetup = () => {
    const props = {
        type: '1',
        handleTabClick: jest.fn(),
    };
    const wrapper = render(
        <ThemeProvider theme={theme}>
            <Button events={{}} properties={{'test': 1}}>Follow</Button>)
        </ThemeProvider>,
    );

    return {
        props,
        wrapper,
    };
};
const AtomPaneSetup = () => {
    const props = {
        type: '1',
        handleTabClick: jest.fn(),
    };
    const wrapper = render(
        <ThemeProvider theme={theme}> <AtomPane/>)</ThemeProvider>);

    return {
        props,
        wrapper,
    };
};

const RootPaneSetup = () => {
    const props = {
        children: `<div>123</div>`,
        className: 'root_test',
        properties: {
            background: {
                color: '#ccc',
                image: 'https://pics6.baidu.com/feed/6609c93d70cf3bc743c03f66869e7ca4cf112a98.jpeg?token=02daea0ccacf3efb0bb8000691929b63&s=22D21CC58E63B355506DE597030000C3',
                size: '50',
            },
        },
        handleTabClick: jest.fn(),
    };
    const wrapper = renderer.create(
        <Root
            children={props.children}
            className={props.className}
            properties={props.properties}
        />,
    ).toJSON();

    return {
        props,
        wrapper,
    };
};

const SliderSetup = () => {
    const props = {
        type: '1',
    };
    const actions = {
        onChange: jest.fn(),
        handleTabClick: jest.fn(),
    };
    const wrapper = shallow(<Slider
        properties={{}} events={{}}/>);

    return {
        props,
        wrapper,
        actions,
    };
};

describe('core/adapters/atoms', () => {
    describe('Grid testing', () => {
        it('the Grid status is correct', () => {
            const wrapper = render(
                <Grid properties={{'test': 1}}>Follow</Grid>,
            );
            expect(wrapper).toMatchSnapshot();
        });
    });

    // describe('Button testing', () => {
    //     const {wrapper} = ButtonSetup();
    //     it('the Button status is correct', () => {
    //         expect(wrapper).toMatchSnapshot();
    //     });
    // });

    // describe('AtomPane testing', () => {
    //     const {wrapper} = AtomPaneSetup();
    //     it('the AtomPane status is correct', () => {
    //         expect(wrapper).toMatchSnapshot();
    //     });
    // });

    describe('Icon testing', () => {
        it('the Icon status is correct', () => {
            const wrapper = mount(<Icon type="B" className="icon_test"/>);
            // expect(wrapper.find('icon').prop('type')).toEqual('B');
            expect(wrapper).toMatchSnapshot();
        });
        it('should support basic usage', () => {
            const wrapper = renderer.create(
                <div>
                    <Icon type="A" className="icon_test1"/>
                    <Icon type="B" className="icon_test2"/>
                    <Icon type="C" className="icon_test3  "/>
                </div>,
            ).toJSON();
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('Navigation testing', () => {
        it('the Navigation status is correct', () => {
            const wrapper = renderer.create(<Navigation
                properties={{}}/>).toJSON();
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('Root testing', () => {
        it('the Root status is correct', () => {
            const {wrapper} = RootPaneSetup();
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('Slider testing', () => {
        it('the Slider status is correct', () => {
            const value = '测试Slider==========onchange事件';
            const {wrapper, actions} = SliderSetup();
            expect(actions.onChange.mock.calls.length).toBe(0);
            wrapper.find('#mui_slider').simulate('change', value);
        });
    });

    describe('Typography testing', () => {
        it('the Typography status is correct', () => {
            const wrapper = renderer.create(<Typography
                properties={{}}/>).toJSON();
            expect(wrapper).toMatchSnapshot();
        });
    });

});
