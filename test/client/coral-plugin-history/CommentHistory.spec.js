import React from 'react';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';
import CommentHistory from '../../../client/coral-plugin-history/CommentHistory';

describe('coral-plugin-history/CommentHistory', () => {
  let render;
  const comments = [{body: 'a comment or something', 'status_history':[{'type':'premod', 'created_at':'2016-12-09T01:40:53.327Z', 'assigned_by':null}, {'created_at':'2016-12-09T22:52:44.888Z', 'type':'accepted', 'assigned_by':'92256159-1164-4f66-9970-c7f23de7e461'}], 'asset_id':'96fddf96-7c83-4008-80ad-50091997d006', 'created_at':'2016-12-09T01:40:53.360Z', 'author_id':'92256159-1164-4f66-9970-c7f23de7e461', 'status':'accepted', '__v':0, 'updated_at':'2016-12-09T22:52:44.893Z', 'id':'3962c2ea-4ec4-42e4-b9bd-c571ff30f56b'}, {'body':'another comment', 'status_history':[{'type':'premod', 'created_at':'2016-12-09T22:53:43.148Z', 'assigned_by':null}], 'asset_id':'96fddf96-7c83-4008-80ad-50091997d006', 'created_at':'2016-12-09T22:53:43.158Z', 'author_id':'92256159-1164-4f66-9970-c7f23de7e461', 'status':'premod', '__v':0, 'updated_at':'2016-12-09T22:53:43.158Z', 'id':'b51e27af-bcfd-4932-91be-e3f01a4802e6'}, {'body':'can I comment?', 'status_history':[{'type':'premod', 'created_at':'2016-12-13T23:23:47.123Z', 'assigned_by':null}, {'created_at':'2016-12-13T23:23:58.487Z', 'type':'accepted', 'assigned_by':'92256159-1164-4f66-9970-c7f23de7e461'}], 'asset_id':'cef81015-1b53-4d70-b9af-6eca680f22fc', 'created_at':'2016-12-13T23:23:47.131Z', 'author_id':'92256159-1164-4f66-9970-c7f23de7e461', 'status':'accepted', '__v':0, 'updated_at':'2016-12-13T23:23:58.493Z', 'id':'dc9d7be1-b911-4dc3-8e1e-400e8b8d110e'}, {'body':'pre-mod comment', 'status_history':[{'type':'premod', 'created_at':'2016-12-08T21:34:56.994Z', 'assigned_by':null}, {'created_at':'2016-12-08T21:38:04.961Z', 'type':'rejected', 'assigned_by':'92256159-1164-4f66-9970-c7f23de7e461'}], 'asset_id':'96fddf96-7c83-4008-80ad-50091997d006', 'created_at':'2016-12-08T21:34:56.997Z', 'author_id':'92256159-1164-4f66-9970-c7f23de7e461', 'status':'rejected', '__v':0, 'updated_at':'2016-12-08T21:38:04.965Z', 'id':'6f02af16-a8f8-4ead-80ea-0d48824eb74d'}, {'body':'a flagged  commetn', 'status_history':[{'type':'premod', 'created_at':'2016-12-08T21:38:26.342Z', 'assigned_by':null}, {'created_at':'2016-12-09T23:47:27.009Z', 'type':'accepted', 'assigned_by':'92256159-1164-4f66-9970-c7f23de7e461'}], 'asset_id':'96fddf96-7c83-4008-80ad-50091997d006', 'created_at':'2016-12-08T21:38:26.344Z', 'author_id':'92256159-1164-4f66-9970-c7f23de7e461', 'status':'accepted', '__v':0, 'updated_at':'2016-12-09T23:47:27.018Z', 'id':'784c5f91-36b9-4bda-b4ca-a114cef2c9f0'}, {'body':'a post mod comment', 'status_history':[{'type':'premod', 'created_at':'2016-12-08T22:19:05.870Z', 'assigned_by':null}, {'created_at':'2016-12-09T23:26:41.427Z', 'type':'accepted', 'assigned_by':'92256159-1164-4f66-9970-c7f23de7e461'}], 'asset_id':'96fddf96-7c83-4008-80ad-50091997d006', 'created_at':'2016-12-08T22:19:05.874Z', 'author_id':'92256159-1164-4f66-9970-c7f23de7e461', 'status':'accepted', '__v':0, 'updated_at':'2016-12-09T23:26:41.450Z', 'id':'e8b86039-f850-4e53-bd9d-f8c9186a9637'}, {'body':'an actual post-mod comment here', 'status_history':[], 'asset_id':'96fddf96-7c83-4008-80ad-50091997d006', 'created_at':'2016-12-08T22:20:11.147Z', 'author_id':'92256159-1164-4f66-9970-c7f23de7e461', 'status':null, '__v':0, 'updated_at':'2016-12-08T22:20:11.147Z', 'id':'cff1a318-50c6-431e-9a63-de7a7b7136bf'}];
  const asset = {
    'settings': null,
    'created_at':'2016-12-06T21:36:09.302Z',
    'url':'localhost:3000/',
    'scraped':null,
    'status':'open',
    'updated_at':'2016-12-08T02:11:15.943Z',
    '_id':'58472f499e775a38f23d5da0',
    'type':'article',
    'closedMessage':null,
    'id':'7302e637-f884-47c0-9723-02cc10a18617',
    'closedAt':null
  };

  beforeEach(() => {
    render = shallow(<CommentHistory comments={comments} asset={asset} link={()=>{}}/>);
  });

  it('should render Comments as children when given comments and assets', () => {
    const wrapper = mount(<CommentHistory comments={comments} asset={asset} link={()=>{}}/>);
    expect(wrapper.find('.commentHistory__list').children()).to.have.length(7);
  });

  it('should render with styles', () => {
    expect(render.props().style).to.be.defined;
  });
});
