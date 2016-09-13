// https://github.com/facebook/react/issues/7386
jest.mock('react/lib/ReactComponentEnvironment');
import 'react-native';
import React from 'react';
import QRCode from '../index';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <QRCode />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
