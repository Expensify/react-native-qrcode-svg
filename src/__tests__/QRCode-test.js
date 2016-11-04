import React from 'react';
import QRCode from '../index';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <QRCode />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
