import React from 'react';
import { shallow } from 'enzyme';
import ContentPage from './ContentPage';

let wrapper;
beforeEach(() => {
  wrapper = shallow(
    <ContentPage title="Page Title" subtitle="Subtitle">
      <div id="id-content">Child Content</div>
    </ContentPage>,
  );
});

describe('ContentPage', () => {
  it('should render ContentPage correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render ContentPageHeader and ContentPageContent components', () => {
    expect(wrapper.find('ContentPageHeader').length).toBe(1);

    const contentPageHeaderWrapper = wrapper.find('ContentPageHeader').first();
    expect(contentPageHeaderWrapper.prop('title')).toEqual('Page Title');
    expect(contentPageHeaderWrapper.prop('subtitle')).toEqual('Subtitle');

    expect(wrapper.find('ContentPageContent').length).toBe(1);

    const contentPageContentWrapper = wrapper.find('ContentPageContent').first();
    expect(contentPageContentWrapper.find('#id-content').length).toBe(1);
  });
});
