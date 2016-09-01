webpackJsonp([0,2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(331);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _App = __webpack_require__(471);

	var _App2 = _interopRequireDefault(_App);

	var _store = __webpack_require__(571);

	var _store2 = _interopRequireDefault(_store);

	var _reactRedux = __webpack_require__(472);

	__webpack_require__(579);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var store = (0, _store2.default)();

	_reactDom2.default.render(_react2.default.createElement(
	  _reactRedux.Provider,
	  { store: store },
	  _react2.default.createElement(_App2.default, null)
		), document.getElementById('designFixationApp'));

/***/ },

/***/ 471:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(472);

	var _App = __webpack_require__(495);

	var _App2 = _interopRequireDefault(_App);

	var _QueryList = __webpack_require__(496);

	var _QueryList2 = _interopRequireDefault(_QueryList);

	var _CollectionView = __webpack_require__(511);

	var _CollectionView2 = _interopRequireDefault(_CollectionView);

	var _Summary = __webpack_require__(516);

	var _Summary2 = _interopRequireDefault(_Summary);

	var _Title = __webpack_require__(518);

	var _Title2 = _interopRequireDefault(_Title);

	var _socket = __webpack_require__(520);

	var _socket2 = _interopRequireDefault(_socket);

	var _dataActions = __webpack_require__(569);

	var _studyActions = __webpack_require__(570);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var scrollTo = function scrollTo(element, to, duration) {
	  if (duration > 0) {
	    (function () {
	      var difference = to - element.scrollTop;
	      var perTick = difference / duration * 10;

	      setTimeout(function () {
	        element.scrollTop = element.scrollTop + perTick;
	        if (difference > 0 && element.scrollTop < to || difference < 0 && element.scrollTop > to) {
	          scrollTo(element, to, duration - 10);
	        }
	      }, 10);
	    })();
	  }
	};

	var App = function (_React$Component) {
	  _inherits(App, _React$Component);

	  function App() {
	    _classCallCheck(this, App);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(App).apply(this, arguments));
	  }

	  _createClass(App, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(newProps) {
	      var focusedGroupPage = newProps.focusedGroupPage;
	      var focusedGroupQuery = newProps.focusedGroupQuery;


	      if (focusedGroupPage !== this.props.focusedGroupPage || focusedGroupQuery !== this.props.focusedGroupQuery) {
	        if (focusedGroupPage) {
	          var selectorQuery = '.page' + focusedGroupPage;
	          if (focusedGroupQuery) {
	            selectorQuery = selectorQuery + '.' + focusedGroupQuery.replace(/\s/g, '_').replace(/"/g, '');
	          }
	          console.log(selectorQuery);
	          var matchingElements = Array.prototype.slice.call(document.querySelectorAll(selectorQuery));
	          var topMatchingElement = matchingElements.sort(function (a, b) {
	            return a.offsetTop - b.offsetTop;
	          })[0];

	          scrollTo(this._main, topMatchingElement.offsetTop, 200);
	        }
	      }
	    }
	  }, {
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var dispatch = this.props.dispatch;


	      _socket2.default.emit('get study');

	      _socket2.default.on('study', function (data) {
	        dispatch((0, _studyActions.receiveStudy)(data.participantId, data.sessionId, data.condition, data.taskAlias));
	        _socket2.default.emit('get data', { sessionId: data.training ? 'test' : data.sessionId, taskAlias: data.taskAlias });
	      });

	      _socket2.default.on('confirm kill study', function () {
	        dispatch((0, _studyActions.killStudy)());
	      });

	      _socket2.default.on('confirm create example', function (e) {
	        dispatch((0, _dataActions.receiveExample)(e));
	      });

	      _socket2.default.on('confirm create query', function (q) {
	        dispatch((0, _dataActions.receiveQuery)(q));
	      });

	      _socket2.default.on('data', function (data) {
	        dispatch((0, _dataActions.receiveData)(data.queries, data.examples, data.task));
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var condition = this.props.condition;


	      var sidebarEl = '';
	      if (condition === 'system') {
	        sidebarEl = _react2.default.createElement(
	          'div',
	          { className: _App2.default.AppSidebar },
	          _react2.default.createElement(
	            'div',
	            { className: _App2.default.AppSidebar__heading },
	            _react2.default.createElement(_Title2.default, { title: 'Collection Summary' })
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: _App2.default.AppSidebar__section },
	            _react2.default.createElement(_Summary2.default, null)
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: _App2.default.AppSidebar__heading },
	            _react2.default.createElement(_Title2.default, { title: 'Search History' })
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: _App2.default.AppSidebar__section + ' ' + _App2.default.AppSidebar__section_full },
	            _react2.default.createElement(_QueryList2.default, null)
	          )
	        );
	      }

	      return _react2.default.createElement(
	        'div',
	        { className: _App2.default.App },
	        sidebarEl,
	        _react2.default.createElement(
	          'div',
	          {
	            ref: function ref(el) {
	              _this2._main = el;
	            },
	            className: _App2.default.App__main },
	          _react2.default.createElement(_CollectionView2.default, null)
	        )
	      );
	    }
	  }]);

	  return App;
	}(_react2.default.Component);

	exports.default = (0, _reactRedux.connect)(function (state) {
	  return {
	    sessionId: state.study.sessionId,
	    condition: state.study.condition,
	    focusedGroupPage: state.ui.focusedGroupPage,
	    focusedGroupQuery: state.ui.focusedGroupQuery
	  };
		})(App);

/***/ },

/***/ 495:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"App":"App__App___lBEXI","App__main":"App__App__main___2VZji","AppSidebar":"App__AppSidebar___wXvF4","AppSidebar__heading":"App__AppSidebar__heading___nZ31m","AppSidebar__section":"App__AppSidebar__section___QZuCD","AppSidebar__section_full":"App__AppSidebar__section_full___2-O-7"};

/***/ },

/***/ 496:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(472);

	var _QueryList = __webpack_require__(497);

	var _QueryList2 = _interopRequireDefault(_QueryList);

	var _Query = __webpack_require__(498);

	var _Query2 = _interopRequireDefault(_Query);

	var _List = __webpack_require__(509);

	var _List2 = _interopRequireDefault(_List);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var QueryList = function (_React$Component) {
	  _inherits(QueryList, _React$Component);

	  function QueryList() {
	    _classCallCheck(this, QueryList);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(QueryList).apply(this, arguments));
	  }

	  _createClass(QueryList, [{
	    key: 'render',
	    value: function render() {
	      var queries = this.props.queries;


	      return _react2.default.createElement(_List2.default, {
	        n: 1.5,
	        items: queries.map(function (q, index) {
	          return _react2.default.createElement(_Query2.default, {
	            key: index,
	            query: q });
	        }) });
	    }
	  }]);

	  return QueryList;
	}(_react2.default.Component);

	exports.default = (0, _reactRedux.connect)(function (state) {
	  return {
	    queries: [].concat(_toConsumableArray(state.data.queries)).sort(function (a, b) {
	      return b.examplesCount - a.examplesCount;
	    })
	  };
		})(QueryList);

/***/ },

/***/ 497:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"QueryList":"QueryList__QueryList___2HcgL"};

/***/ },

/***/ 498:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(472);

	var _Query = __webpack_require__(499);

	var _Query2 = _interopRequireDefault(_Query);

	var _Media = __webpack_require__(500);

	var _Media2 = _interopRequireDefault(_Media);

	var _Flex = __webpack_require__(502);

	var _Flex2 = _interopRequireDefault(_Flex);

	var _ExamplesBar = __webpack_require__(503);

	var _ExamplesBar2 = _interopRequireDefault(_ExamplesBar);

	var _Block = __webpack_require__(508);

	var _Block2 = _interopRequireDefault(_Block);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var Query = function Query(_ref) {
	  var query = _ref.query;
	  var examples = _ref.examples;

	  var searchResultsChartData = [{
	    label: '10+',
	    page: 10,
	    examples: examples.filter(function (e) {
	      return e.relevance === 10;
	    })
	  }];

	  var _loop = function _loop(i) {
	    searchResultsChartData = [{
	      label: '' + i,
	      page: i,
	      examples: examples.filter(function (e) {
	        return e.relevance === i;
	      })
	    }].concat(_toConsumableArray(searchResultsChartData));
	  };

	  for (var i = 9; i > 0; i--) {
	    _loop(i);
	  }

	  var searchResultsChart = _react2.default.createElement(
	    'div',
	    { className: _Query2.default.qChart },
	    _react2.default.createElement(
	      'div',
	      { className: _Query2.default.qChart__title },
	      'Search Result Pages'
	    ),
	    _react2.default.createElement(
	      _Block2.default,
	      { n: 0.5 },
	      _react2.default.createElement(
	        'div',
	        { className: _Query2.default.qChart__canvas },
	        searchResultsChartData.map(function (s, index) {
	          return _react2.default.createElement(_ExamplesBar2.default, {
	            key: index,
	            query: query.query,
	            page: s.page,
	            label: s.label,
	            examples: examples.filter(function (e) {
	              return e.relevance === s.page;
	            }) });
	        })
	      )
	    )
	  );

	  var relatedImagesChart = _react2.default.createElement(
	    'div',
	    { className: _Query2.default.qChart },
	    _react2.default.createElement(
	      'div',
	      { className: _Query2.default.qChart__title },
	      'Related Images'
	    ),
	    _react2.default.createElement(
	      _Block2.default,
	      { n: 0.5 },
	      _react2.default.createElement(
	        'div',
	        { className: _Query2.default.qChart__canvas },
	        _react2.default.createElement(_ExamplesBar2.default, {
	          query: query.query,
	          page: -1,
	          theme: 'accent2',
	          examples: examples.filter(function (e) {
	            return e.relevance === -1;
	          }) })
	      )
	    )
	  );

	  return _react2.default.createElement(
	    'div',
	    { className: _Query2.default.Query },
	    _react2.default.createElement(
	      'div',
	      { className: _Query2.default.Query__header },
	      _react2.default.createElement(
	        'div',
	        { className: _Query2.default.qHeader },
	        _react2.default.createElement(
	          _Flex2.default,
	          {
	            alignItems: 'center',
	            justifyContent: 'space-between' },
	          _react2.default.createElement(
	            'div',
	            { className: _Query2.default.qHeader__query },
	            query.query
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: _Query2.default.qHeader__examplesCount },
	            query.examplesCount,
	            ' example(s)'
	          )
	        )
	      )
	    ),
	    query.examplesCount ? _react2.default.createElement(
	      'div',
	      { className: _Query2.default.Query__body },
	      _react2.default.createElement(_Media2.default, {
	        alignItems: 'stretch',
	        figure: searchResultsChart,
	        body: relatedImagesChart })
	    ) : ''
	  );
	};

	exports.default = (0, _reactRedux.connect)(function (state, ownProps) {
	  return {
	    examples: state.data.examples.filter(function (e) {
	      return e.query === ownProps.query.query;
	    })
	  };
		})(Query);

/***/ },

/***/ 499:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"Query":"Query__Query___32yVP","Query__header":"Query__Query__header____CMRg","Query__body":"Query__Query__body___3wjLX","qHeader":"Query__qHeader___1vH8H","qHeader__query":"Query__qHeader__query___AneVh","qHeader__examplesCount":"Query__qHeader__examplesCount___1x_SX","qChart":"Query__qChart___EjNV6","qChart__title":"Query__qChart__title___hN_to","qChart__canvas":"Query__qChart__canvas___1knIp"};

/***/ },

/***/ 500:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _Media = __webpack_require__(501);

	var _Media2 = _interopRequireDefault(_Media);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var baseline = 0.750;


	var MediaBody = function MediaBody(_ref) {
	  var content = _ref.content;

	  return _react2.default.createElement(
	    'div',
	    { className: _Media2.default.media__body },
	    content
	  );
	};

	var MediaFigure = function MediaFigure(_ref2) {
	  var n = _ref2.n;
	  var content = _ref2.content;
	  var _ref2$reverse = _ref2.reverse;
	  var reverse = _ref2$reverse === undefined ? false : _ref2$reverse;

	  var style = {};
	  if (reverse) {
	    style.marginLeft = baseline * n + 'rem';
	  } else {
	    style.marginRight = baseline * n + 'rem';
	  }

	  return _react2.default.createElement(
	    'div',
	    { style: style, className: _Media2.default.media__figure },
	    content
	  );
	};

	var Media = function Media(_ref3) {
	  var figure = _ref3.figure;
	  var body = _ref3.body;
	  var _ref3$n = _ref3.n;
	  var n = _ref3$n === undefined ? 1 : _ref3$n;
	  var _ref3$reverse = _ref3.reverse;
	  var reverse = _ref3$reverse === undefined ? false : _ref3$reverse;
	  var _ref3$alignItems = _ref3.alignItems;
	  var alignItems = _ref3$alignItems === undefined ? 'flex-start' : _ref3$alignItems;

	  var style = {
	    alignItems: alignItems
	  };

	  var figureElement = _react2.default.createElement(MediaFigure, {
	    content: figure,
	    reverse: reverse,
	    n: n });

	  var bodyElement = _react2.default.createElement(MediaBody, {
	    content: body });

	  if (reverse) {
	    return _react2.default.createElement(
	      'div',
	      { style: style, className: _Media2.default.media },
	      bodyElement,
	      figureElement
	    );
	  } else {
	    return _react2.default.createElement(
	      'div',
	      { style: style, className: _Media2.default.media },
	      figureElement,
	      bodyElement
	    );
	  }
	};

	exports.default = Media;

/***/ },

/***/ 501:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"media":"Media__media___9EAih","media__figure":"Media__media__figure___1msaG","media__body":"Media__media__body___1VZfM"};

/***/ },

/***/ 502:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Flex = function Flex(_ref) {
	  var _ref$flexDirection = _ref.flexDirection;
	  var flexDirection = _ref$flexDirection === undefined ? 'row' : _ref$flexDirection;
	  var _ref$justifyContent = _ref.justifyContent;
	  var justifyContent = _ref$justifyContent === undefined ? 'flex-start' : _ref$justifyContent;
	  var _ref$alignItems = _ref.alignItems;
	  var alignItems = _ref$alignItems === undefined ? 'center' : _ref$alignItems;
	  var children = _ref.children;

	  var style = {
	    flexDirection: flexDirection,
	    alignItems: alignItems,
	    justifyContent: justifyContent,
	    display: 'flex',
	    width: '100%',
	    height: '100%'
	  };

	  return _react2.default.createElement(
	    'div',
	    { style: style },
	    children
	  );
	};

	exports.default = Flex;

/***/ },

/***/ 503:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(472);

	var _ExamplesBar = __webpack_require__(504);

	var _ExamplesBar2 = _interopRequireDefault(_ExamplesBar);

	var _ExamplesBarItem = __webpack_require__(505);

	var _ExamplesBarItem2 = _interopRequireDefault(_ExamplesBarItem);

	var _uiActions = __webpack_require__(507);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ExamplesBar = function ExamplesBar(_ref) {
	  var examples = _ref.examples;
	  var query = _ref.query;
	  var page = _ref.page;
	  var _ref$label = _ref.label;
	  var label = _ref$label === undefined ? '' : _ref$label;
	  var focusedGroupPage = _ref.focusedGroupPage;
	  var focusedGroupQuery = _ref.focusedGroupQuery;
	  var toggleFocusExampleGroup = _ref.toggleFocusExampleGroup;

	  var classNames = [_ExamplesBar2.default.ExamplesBar];
	  if (focusedGroupPage) {
	    if (focusedGroupQuery && focusedGroupQuery !== query || focusedGroupPage !== page) {
	      classNames.push(_ExamplesBar2.default.ExamplesBar_dimmed);
	    }
	  }

	  return _react2.default.createElement(
	    'div',
	    {
	      onClick: toggleFocusExampleGroup,
	      className: classNames.join(' ') },
	    examples.map(function (e, index) {
	      return _react2.default.createElement(_ExamplesBarItem2.default, {
	        key: index,
	        example: e });
	    }),
	    _react2.default.createElement(
	      'div',
	      { className: _ExamplesBar2.default.ExamplesBar__label },
	      label
	    )
	  );
	};

	exports.default = (0, _reactRedux.connect)(function (state) {
	  return {
	    focusedGroupPage: state.ui.focusedGroupPage,
	    focusedGroupQuery: state.ui.focusedGroupQuery
	  };
	}, function (dispatch, ownProps) {
	  return {
	    toggleFocusExampleGroup: function toggleFocusExampleGroup() {
	      dispatch((0, _uiActions.toggleFocusExampleGroup)(ownProps.query, ownProps.page));
	    }
	  };
		})(ExamplesBar);

/***/ },

/***/ 504:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"ExamplesBar":"ExamplesBar__ExamplesBar___2Ba8-","ExamplesBar__label":"ExamplesBar__ExamplesBar__label___14Cl1","ExamplesBar_dimmed":"ExamplesBar__ExamplesBar_dimmed___1nFEB"};

/***/ },

/***/ 505:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(472);

	var _ExamplesBarItem = __webpack_require__(506);

	var _ExamplesBarItem2 = _interopRequireDefault(_ExamplesBarItem);

	var _uiActions = __webpack_require__(507);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ExamplesBarItem = function ExamplesBarItem(_ref) {
	  var example = _ref.example;
	  var highlightedExampleId = _ref.highlightedExampleId;
	  var highlightExample = _ref.highlightExample;
	  var dimExample = _ref.dimExample;

	  return _react2.default.createElement('div', {
	    onMouseEnter: highlightExample,
	    onMouseLeave: dimExample,
	    className: _ExamplesBarItem2.default.ExamplesBarItem + ' ' + (highlightedExampleId === example._id ? _ExamplesBarItem2.default.ExamplesBarItem_highlighted : '') });
	};

	exports.default = (0, _reactRedux.connect)(function (state) {
	  return {
	    highlightedExampleId: state.ui.highlightedExampleId
	  };
	}, function (dispatch, ownProps) {
	  return {
	    highlightExample: function highlightExample() {
	      dispatch((0, _uiActions.highlightExample)(ownProps.example._id));
	    },
	    dimExample: function dimExample() {
	      dispatch((0, _uiActions.highlightExample)(null));
	    }
	  };
		})(ExamplesBarItem);

/***/ },

/***/ 506:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"ExamplesBarItem":"ExamplesBarItem__ExamplesBarItem___K0GEc"};

/***/ },

/***/ 507:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var TOGGLE_FOCUS_EXAMPLE_GROUP = exports.TOGGLE_FOCUS_EXAMPLE_GROUP = 'TOGGLE_FOCUS_EXAMPLE_GROUP';
	var HIGHLIGHT_EXAMPLE = exports.HIGHLIGHT_EXAMPLE = 'HIGHLIGHT_EXAMPLE';

	var highlightExample = exports.highlightExample = function highlightExample(id) {
	  return {
	    type: HIGHLIGHT_EXAMPLE,
	    id: id
	  };
	};

	var toggleFocusExampleGroup = exports.toggleFocusExampleGroup = function toggleFocusExampleGroup(query, page) {
	  return {
	    type: TOGGLE_FOCUS_EXAMPLE_GROUP,
	    query: query,
	    page: page
	  };
		};

/***/ },

/***/ 508:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var baseline = 0.750;

	var Block = function Block(_ref) {
	  var _ref$n = _ref.n;
	  var n = _ref$n === undefined ? 1 : _ref$n;
	  var _ref$extraClassNames = _ref.extraClassNames;
	  var extraClassNames = _ref$extraClassNames === undefined ? '' : _ref$extraClassNames;
	  var children = _ref.children;

	  var style = {
	    marginBottom: baseline * n + 'rem'
	  };

	  return _react2.default.createElement(
	    'div',
	    { style: style, className: extraClassNames },
	    children
	  );
	};

	exports.default = Block;

/***/ },

/***/ 509:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _List = __webpack_require__(510);

	var _List2 = _interopRequireDefault(_List);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var baseline = 0.750;


	var ListItem = function ListItem(_ref) {
	  var _ref$n = _ref.n;
	  var n = _ref$n === undefined ? 1 : _ref$n;
	  var item = _ref.item;

	  var style = {
	    marginBottom: baseline * n + 'rem'
	  };

	  return _react2.default.createElement(
	    'li',
	    { style: style, className: _List2.default.list__item },
	    item
	  );
	};

	var List = function List(_ref2) {
	  var items = _ref2.items;
	  var _ref2$n = _ref2.n;
	  var n = _ref2$n === undefined ? 1 : _ref2$n;
	  var _ref2$alignItems = _ref2.alignItems;
	  var alignItems = _ref2$alignItems === undefined ? 'flex-start' : _ref2$alignItems;
	  var _ref2$justifyContent = _ref2.justifyContent;
	  var justifyContent = _ref2$justifyContent === undefined ? 'flex-start' : _ref2$justifyContent;

	  var style = {
	    marginBottom: '-' + baseline * n + 'rem',
	    alignItems: alignItems,
	    justifyContent: justifyContent
	  };

	  var listItems = items.map(function (i, index) {
	    return _react2.default.createElement(ListItem, { key: index, item: i, n: n });
	  });

	  return _react2.default.createElement(
	    'ul',
	    { style: style, className: _List2.default.list },
	    listItems
	  );
	};

	exports.default = List;

/***/ },

/***/ 510:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"list":"List__list___2Ho-z","list__item":"List__list__item___Kvdr6"};

/***/ },

/***/ 511:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(472);

	var _ExampleList = __webpack_require__(512);

	var _ExampleList2 = _interopRequireDefault(_ExampleList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var CollectionView = function CollectionView(_ref) {
	  var examples = _ref.examples;

	  return _react2.default.createElement(_ExampleList2.default, {
	    nCols: 5,
	    examples: examples });
	};

	exports.default = (0, _reactRedux.connect)(function (state) {
	  return {
	    examples: [].concat(_toConsumableArray(state.data.examples)).sort(function (a, b) {
	      if (b.createdAt > a.createdAt) {
	        return -1;
	      } else if (a.createdAt >= b.createdAt) {
	        return 1;
	      }
	    })
	  };
		})(CollectionView);

/***/ },

/***/ 512:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _ExampleList = __webpack_require__(513);

	var _ExampleList2 = _interopRequireDefault(_ExampleList);

	var _Example = __webpack_require__(514);

	var _Example2 = _interopRequireDefault(_Example);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ExampleList = function (_React$Component) {
	  _inherits(ExampleList, _React$Component);

	  function ExampleList() {
	    _classCallCheck(this, ExampleList);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(ExampleList).apply(this, arguments));
	  }

	  _createClass(ExampleList, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var examples = _props.examples;
	      var nCols = _props.nCols;

	      var columns = [];

	      var _loop = function _loop(i) {
	        var column = examples.filter(function (e, index) {
	          return index % nCols === i;
	        });

	        columns.push(column);
	      };

	      for (var i = 0; i < nCols; i++) {
	        _loop(i);
	      }

	      var classNames = [_ExampleList2.default.ExampleList];

	      return _react2.default.createElement(
	        'div',
	        { className: classNames.join(' ') },
	        columns.map(function (column, i) {
	          return _react2.default.createElement(
	            'div',
	            {
	              key: i,
	              className: _ExampleList2.default.ExampleList__column },
	            column.map(function (example, j) {
	              return _react2.default.createElement(
	                'div',
	                {
	                  key: j,
	                  className: _ExampleList2.default.ExampleList__example },
	                _react2.default.createElement(_Example2.default, {
	                  compact: nCols > 5,
	                  example: example })
	              );
	            })
	          );
	        })
	      );
	    }
	  }]);

	  return ExampleList;
	}(_react2.default.Component);

		exports.default = ExampleList;

/***/ },

/***/ 513:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"ExampleList":"ExampleList__ExampleList___74Jc3","ExampleList__column":"ExampleList__ExampleList__column___3FzkW","ExampleList__example":"ExampleList__ExampleList__example___3ejL_"};

/***/ },

/***/ 514:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(472);

	var _Example = __webpack_require__(515);

	var _Example2 = _interopRequireDefault(_Example);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Example = function Example(_ref) {
	  var example = _ref.example;
	  var focusedGroupPage = _ref.focusedGroupPage;
	  var focusedGroupQuery = _ref.focusedGroupQuery;
	  var highlightedExampleId = _ref.highlightedExampleId;

	  var classNames = [_Example2.default.Example, example.query.replace(/\s/g, '_').replace(/"/g, ''), 'page' + example.relevance];
	  if (focusedGroupPage) {
	    if (focusedGroupQuery && focusedGroupQuery !== example.query) {
	      classNames.push(_Example2.default.Example_dimmed);
	    } else if (focusedGroupPage !== example.relevance) {
	      classNames.push(_Example2.default.Example_dimmed);
	    } else {
	      classNames.push(_Example2.default.Example_focused);
	    }
	  }

	  if (highlightedExampleId === example._id) {
	    classNames.push(_Example2.default.Example_highlighted);
	  }

	  return _react2.default.createElement(
	    'div',
	    {
	      id: example._id,
	      className: classNames.join(' ') },
	    _react2.default.createElement(
	      'div',
	      { className: _Example2.default.Example__imageWrapper },
	      _react2.default.createElement('img', {
	        className: _Example2.default.Example__image,
	        src: example.example.src })
	    ),
	    _react2.default.createElement(
	      'div',
	      { className: _Example2.default.Example__descriptionOverlay },
	      _react2.default.createElement(
	        'div',
	        { className: _Example2.default.Example__description },
	        example.imageDescription
	      )
	    )
	  );
	};

	exports.default = (0, _reactRedux.connect)(function (state, ownProps) {
	  return {
	    focusedGroupPage: state.ui.focusedGroupPage,
	    focusedGroupQuery: state.ui.focusedGroupQuery,
	    highlightedExampleId: state.ui.highlightedExampleId
	  };
		})(Example);

/***/ },

/***/ 515:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"Example":"Example__Example___27S0i","Example__imageWrapper":"Example__Example__imageWrapper___1L-z5","Example__image":"Example__Example__image___3Yd61","Example__descriptionOverlay":"Example__Example__descriptionOverlay___2UzC3","Example__description":"Example__Example__description___1RWhr","Example_dimmed":"Example__Example_dimmed___2sTfY","Example_focused":"Example__Example_focused___36rx0"};

/***/ },

/***/ 516:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(472);

	var _Summary = __webpack_require__(517);

	var _Summary2 = _interopRequireDefault(_Summary);

	var _Media = __webpack_require__(500);

	var _Media2 = _interopRequireDefault(_Media);

	var _Flex = __webpack_require__(502);

	var _Flex2 = _interopRequireDefault(_Flex);

	var _ExamplesBar = __webpack_require__(503);

	var _ExamplesBar2 = _interopRequireDefault(_ExamplesBar);

	var _Block = __webpack_require__(508);

	var _Block2 = _interopRequireDefault(_Block);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var Summary = function Summary(_ref) {
	  var queriesCount = _ref.queriesCount;
	  var examples = _ref.examples;

	  var searchResultsChartData = [{
	    label: '10+',
	    page: 10,
	    examples: examples.filter(function (e) {
	      return e.relevance === 10;
	    })
	  }];

	  var _loop = function _loop(i) {
	    searchResultsChartData = [{
	      label: '' + i,
	      page: i,
	      examples: examples.filter(function (e) {
	        return e.relevance === i;
	      })
	    }].concat(_toConsumableArray(searchResultsChartData));
	  };

	  for (var i = 9; i > 0; i--) {
	    _loop(i);
	  }

	  var searchResultsChart = _react2.default.createElement(
	    'div',
	    { className: _Summary2.default.sChart },
	    _react2.default.createElement(
	      'div',
	      { className: _Summary2.default.sChart__title },
	      'Search Result Pages'
	    ),
	    _react2.default.createElement(
	      _Block2.default,
	      { n: 0.5 },
	      _react2.default.createElement(
	        'div',
	        { className: _Summary2.default.sChart__canvas },
	        searchResultsChartData.map(function (s, index) {
	          return _react2.default.createElement(_ExamplesBar2.default, {
	            key: index,
	            query: null,
	            page: s.page,
	            label: s.label,
	            examples: examples.filter(function (e) {
	              return e.relevance === s.page;
	            }) });
	        })
	      )
	    )
	  );

	  var relatedImagesChart = _react2.default.createElement(
	    'div',
	    { className: _Summary2.default.sChart },
	    _react2.default.createElement(
	      'div',
	      { className: _Summary2.default.sChart__title },
	      'Related Images'
	    ),
	    _react2.default.createElement(
	      _Block2.default,
	      { n: 0.5 },
	      _react2.default.createElement(
	        'div',
	        { className: _Summary2.default.sChart__canvas },
	        _react2.default.createElement(_ExamplesBar2.default, {
	          query: null,
	          page: -1,
	          theme: 'accent2',
	          examples: examples.filter(function (e) {
	            return e.relevance === -1;
	          }) })
	      )
	    )
	  );

	  return _react2.default.createElement(
	    'div',
	    { className: _Summary2.default.Summary },
	    _react2.default.createElement(
	      'div',
	      { className: _Summary2.default.Summary__header },
	      _react2.default.createElement(
	        _Flex2.default,
	        {
	          alignItems: 'center',
	          justifyContent: 'center' },
	        _react2.default.createElement(
	          'div',
	          { className: _Summary2.default.sHeader },
	          _react2.default.createElement(_Media2.default, {
	            alignItems: 'center',
	            figure: _react2.default.createElement(
	              'div',
	              { className: _Summary2.default.sHeader__counter },
	              queriesCount
	            ),
	            body: _react2.default.createElement(
	              'div',
	              { className: _Summary2.default.sHeader__body },
	              'search queries'
	            ) })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: _Summary2.default.sHeader },
	          _react2.default.createElement(_Media2.default, {
	            alignItems: 'center',
	            figure: _react2.default.createElement(
	              'div',
	              { className: _Summary2.default.sHeader__counter },
	              examples.length
	            ),
	            body: _react2.default.createElement(
	              'div',
	              { className: _Summary2.default.sHeader__body },
	              'examples collected'
	            ) })
	        )
	      )
	    ),
	    _react2.default.createElement(
	      'div',
	      { className: _Summary2.default.Summary__body },
	      _react2.default.createElement(_Media2.default, {
	        alignItems: 'stretch',
	        figure: searchResultsChart,
	        body: relatedImagesChart })
	    )
	  );
	};

	exports.default = (0, _reactRedux.connect)(function (state) {
	  return {
	    queriesCount: state.data.queries.length,
	    examples: state.data.examples
	  };
		})(Summary);

/***/ },

/***/ 517:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"Summary":"Summary__Summary___2vbQY","Summary__header":"Summary__Summary__header___1WvvM","Summary__body":"Summary__Summary__body___3F3-b","sHeader":"Summary__sHeader___3-LoW","sHeader__counter":"Summary__sHeader__counter___3Zgqn","sHeader__body":"Summary__sHeader__body___36EEB","sChart":"Summary__sChart___3IpWC","sChart__title":"Summary__sChart__title___2HV6I","sChart__canvas":"Summary__sChart__canvas___1w9nY"};

/***/ },

/***/ 518:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _Title = __webpack_require__(519);

	var _Title2 = _interopRequireDefault(_Title);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Title = function Title(_ref) {
	  var title = _ref.title;

	  return _react2.default.createElement(
	    'div',
	    { className: _Title2.default.Title },
	    _react2.default.createElement(
	      'div',
	      { className: _Title2.default.Title__text },
	      title
	    )
	  );
	};

	exports.default = Title;

/***/ },

/***/ 519:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"Title":"Title__Title___17BuK","Title__text":"Title__Title__text___1TsHj"};

/***/ },

/***/ 520:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _socket = __webpack_require__(521);

	var _socket2 = _interopRequireDefault(_socket);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var socket = (0, _socket2.default)('https://vdziubak.com/', { path: '/designFixationServer' });

	exports.default = socket;

/***/ },

/***/ 569:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var RECEIVE_DATA = exports.RECEIVE_DATA = 'RECEIVE_DATA';
	var RECEIVE_EXAMPLE = exports.RECEIVE_EXAMPLE = 'RECEIVE_EXAMPLE';
	var RECEIVE_QUERY = exports.RECEIVE_QUERY = 'RECEIVE_QUERY';
	var INC_EXAMPLE_COUNTER = exports.INC_EXAMPLE_COUNTER = 'INC_EXAMPLE_COUNTER';

	var receiveExample = exports.receiveExample = function receiveExample(example) {
	  return function (dispatch, getState) {
	    console.log(example);
	    dispatch({
	      type: INC_EXAMPLE_COUNTER,
	      query: example.query
	    });

	    dispatch({
	      type: RECEIVE_EXAMPLE,
	      example: example
	    });
	  };
	};

	var receiveQuery = exports.receiveQuery = function receiveQuery(query) {
	  return function (dispatch) {
	    dispatch({
	      type: RECEIVE_QUERY,
	      query: _extends({}, query, {
	        examplesCount: 0
	      })
	    });
	  };
	};

	var receiveData = exports.receiveData = function receiveData(queries, examples) {
	  return function (dispatch) {
	    var enhancedQueries = queries.map(function (q, index) {
	      return _extends({}, q, {
	        examplesCount: examples.filter(function (e) {
	          return e.query === q.query;
	        }).length
	      });
	    });

	    dispatch({
	      type: RECEIVE_DATA,
	      queries: enhancedQueries,
	      examples: examples
	    });
	  };
	};

/***/ },

/***/ 570:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var RECEIVE_STUDY = exports.RECEIVE_STUDY = 'RECEIVE_STUDY';
	var KILL_STUDY = exports.KILL_STUDY = 'KILL_STUDY';

	var receiveStudy = exports.receiveStudy = function receiveStudy(participantId, sessionId, condition, taskAlias) {
	  return {
	    type: RECEIVE_STUDY,
	    participantId: participantId,
	    sessionId: sessionId,
	    condition: condition,
	    taskAlias: taskAlias
	  };
	};

	var killStudy = exports.killStudy = function killStudy() {
	  return {
	    type: KILL_STUDY
	  };
		};

/***/ },

/***/ 571:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(479);

	var _reduxLogger = __webpack_require__(572);

	var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

	var _reduxThunk = __webpack_require__(573);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _rootReducer = __webpack_require__(574);

	var _rootReducer2 = _interopRequireDefault(_rootReducer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var middleware = [_reduxThunk2.default];

	// if (process.env.NODE_ENV === 'development') {
	//   const logger = createLogger()
	//   middleware.push(logger)
	// }

	var configureStore = function configureStore(initialState) {
	  return (0, _redux.createStore)(_rootReducer2.default, initialState, _redux.applyMiddleware.apply(undefined, middleware));
	};

	exports.default = configureStore;

/***/ },

/***/ 574:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(479);

	var _dataReducer = __webpack_require__(575);

	var _dataReducer2 = _interopRequireDefault(_dataReducer);

	var _uiReducer = __webpack_require__(577);

	var _uiReducer2 = _interopRequireDefault(_uiReducer);

	var _studyReducer = __webpack_require__(578);

	var _studyReducer2 = _interopRequireDefault(_studyReducer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var rootReducer = (0, _redux.combineReducers)({
	  data: _dataReducer2.default,
	  ui: _uiReducer2.default,
	  study: _studyReducer2.default
	});

		exports.default = rootReducer;

/***/ },

/***/ 575:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _dataActions = __webpack_require__(569);

	var _initialState = __webpack_require__(576);

	var _initialState2 = _interopRequireDefault(_initialState);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var data = function data() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? _initialState2.default.data : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case _dataActions.RECEIVE_DATA:
	      return _extends({}, state, {
	        queries: action.queries,
	        examples: action.examples
	      });
	    case _dataActions.RECEIVE_EXAMPLE:
	      return _extends({}, state, {
	        examples: [].concat(_toConsumableArray(state.examples), [action.example])
	      });
	    case _dataActions.RECEIVE_QUERY:
	      return _extends({}, state, {
	        queries: [].concat(_toConsumableArray(state.queries), [action.query])
	      });
	    case _dataActions.INC_EXAMPLE_COUNTER:
	      return _extends({}, state, {
	        queries: state.queries.map(function (q) {
	          if (q.query === action.query) {
	            return _extends({}, q, {
	              examplesCount: q.examplesCount + 1
	            });
	          } else {
	            return q;
	          }
	        })
	      });
	    default:
	      return state;
	  }
	};

	exports.default = data;

/***/ },

/***/ 576:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  data: {
	    queries: [],
	    examples: []
	  },
	  ui: {
	    focusedGroupPage: null,
	    focusedGroupQuery: null,
	    highlightedExampleId: null
	  },
	  study: {
	    participantId: '',
	    sessionId: null,
	    condition: 'baseline',
	    taskAlias: ''
	  }
		};

/***/ },

/***/ 577:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _uiActions = __webpack_require__(507);

	var _initialState = __webpack_require__(576);

	var _initialState2 = _interopRequireDefault(_initialState);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ui = function ui() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? _initialState2.default.ui : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case _uiActions.TOGGLE_FOCUS_EXAMPLE_GROUP:
	      if (action.page === state.focusedGroupPage && action.query === state.focusedGroupQuery) {
	        return _extends({}, state, {
	          focusedGroupPage: null,
	          focusedGroupQuery: null
	        });
	      } else {
	        return _extends({}, state, {
	          focusedGroupPage: action.page,
	          focusedGroupQuery: action.query
	        });
	      }
	    case _uiActions.HIGHLIGHT_EXAMPLE:
	      return _extends({}, state, {
	        highlightedExampleId: action.id
	      });
	    default:
	      return state;
	  }
	};

	exports.default = ui;

/***/ },

/***/ 578:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _studyActions = __webpack_require__(570);

	var _initialState = __webpack_require__(576);

	var _initialState2 = _interopRequireDefault(_initialState);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var study = function study() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? _initialState2.default.study : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case _studyActions.RECEIVE_STUDY:
	      return _extends({}, state, {
	        participantId: action.participantId,
	        sessionId: action.sessionId,
	        condition: action.condition,
	        taskAlias: action.taskAlias
	      });
	    case _studyActions.KILL_STUDY:
	      return _extends({}, state, {
	        sessionId: null
	      });
	    default:
	      return state;
	  }
	};

	exports.default = study;

/***/ },

/***/ 579:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvQXBwL0FwcC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQXBwL0FwcC5jc3MiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL1F1ZXJ5TGlzdC9RdWVyeUxpc3QuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1F1ZXJ5TGlzdC9RdWVyeUxpc3QuY3NzIiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9RdWVyeS9RdWVyeS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvUXVlcnkvUXVlcnkuY3NzIiwid2VicGFjazovLy9zcmMvbGF5b3V0cy9NZWRpYS9NZWRpYS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2xheW91dHMvTWVkaWEvTWVkaWEuY3NzIiwid2VicGFjazovLy9zcmMvbGF5b3V0cy9GbGV4L0ZsZXguanN4Iiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9FeGFtcGxlc0Jhci9FeGFtcGxlc0Jhci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRXhhbXBsZXNCYXIvRXhhbXBsZXNCYXIuY3NzIiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9FeGFtcGxlc0Jhckl0ZW0vRXhhbXBsZXNCYXJJdGVtLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9FeGFtcGxlc0Jhckl0ZW0vRXhhbXBsZXNCYXJJdGVtLmNzcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3VpQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vc3JjL2xheW91dHMvQmxvY2svQmxvY2suanN4Iiwid2VicGFjazovLy9zcmMvbGF5b3V0cy9MaXN0L0xpc3QuanN4Iiwid2VicGFjazovLy8uL3NyYy9sYXlvdXRzL0xpc3QvTGlzdC5jc3MiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL0NvbGxlY3Rpb25WaWV3L0NvbGxlY3Rpb25WaWV3LmpzeCIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvRXhhbXBsZUxpc3QvRXhhbXBsZUxpc3QuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V4YW1wbGVMaXN0L0V4YW1wbGVMaXN0LmNzcyIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvRXhhbXBsZS9FeGFtcGxlLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9FeGFtcGxlL0V4YW1wbGUuY3NzIiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9TdW1tYXJ5L1N1bW1hcnkuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1N1bW1hcnkvU3VtbWFyeS5jc3MiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL1RpdGxlL1RpdGxlLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9UaXRsZS9UaXRsZS5jc3MiLCJ3ZWJwYWNrOi8vL3NyYy9zdG9yZS9zb2NrZXQuanMiLCJ3ZWJwYWNrOi8vL3NyYy9zdG9yZS9kYXRhQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3N0dWR5QWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3N0b3JlLmpzIiwid2VicGFjazovLy9zcmMvc3RvcmUvcm9vdFJlZHVjZXIuanMiLCJ3ZWJwYWNrOi8vL3NyYy9zdG9yZS9kYXRhUmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL2luaXRpYWxTdGF0ZS5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3VpUmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3N0dWR5UmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL3Jlc2V0LmNzcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2JhYmVsLXBvbHlmaWxsJ1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJ1xuaW1wb3J0IEFwcCBmcm9tICcuL2NvbXBvbmVudHMvQXBwJ1xuaW1wb3J0IGNvbmZpZ3VyZVN0b3JlIGZyb20gJy4vc3RvcmUnXG5pbXBvcnQge1Byb3ZpZGVyfSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0ICcuL3N0eWxlcy9yZXNldC5jc3MnXG5cbmNvbnN0IHN0b3JlID0gY29uZmlndXJlU3RvcmUoKVxuXG5SZWFjdERPTS5yZW5kZXIoKFxuICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICA8QXBwIC8+XG4gIDwvUHJvdmlkZXI+XG4pLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzaWduRml4YXRpb25BcHAnKSlcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9pbmRleC5qc3hcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4J1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vQXBwLmNzcydcbmltcG9ydCBRdWVyeUxpc3QgZnJvbSAnLi4vUXVlcnlMaXN0J1xuaW1wb3J0IENvbGxlY3Rpb25WaWV3IGZyb20gJy4uL0NvbGxlY3Rpb25WaWV3J1xuaW1wb3J0IFN1bW1hcnkgZnJvbSAnLi4vU3VtbWFyeSdcbmltcG9ydCBUaXRsZSBmcm9tICcuLi9UaXRsZSdcblxuaW1wb3J0IHNvY2tldCBmcm9tICcuLi8uLi9zdG9yZS9zb2NrZXQnXG5pbXBvcnQge3JlY2VpdmVEYXRhLCByZWNlaXZlRXhhbXBsZSwgcmVjZWl2ZVF1ZXJ5fSBmcm9tICcuLi8uLi9zdG9yZS9kYXRhQWN0aW9ucydcbmltcG9ydCB7cmVjZWl2ZVN0dWR5LCBraWxsU3R1ZHl9IGZyb20gJy4uLy4uL3N0b3JlL3N0dWR5QWN0aW9ucydcblxuY29uc3Qgc2Nyb2xsVG8gPSAoZWxlbWVudCwgdG8sIGR1cmF0aW9uKSA9PiB7XG4gIGlmIChkdXJhdGlvbiA+IDApIHtcbiAgICBjb25zdCBkaWZmZXJlbmNlID0gdG8gLSBlbGVtZW50LnNjcm9sbFRvcFxuICAgIGNvbnN0IHBlclRpY2sgPSBkaWZmZXJlbmNlIC8gZHVyYXRpb24gKiAxMFxuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBlbGVtZW50LnNjcm9sbFRvcCA9IGVsZW1lbnQuc2Nyb2xsVG9wICsgcGVyVGlja1xuICAgICAgaWYgKChkaWZmZXJlbmNlID4gMCAmJiBlbGVtZW50LnNjcm9sbFRvcCA8IHRvKSB8fFxuICAgICAgICAgIChkaWZmZXJlbmNlIDwgMCAmJiBlbGVtZW50LnNjcm9sbFRvcCA+IHRvKSkge1xuICAgICAgICBzY3JvbGxUbyhlbGVtZW50LCB0bywgZHVyYXRpb24gLSAxMClcbiAgICAgIH1cbiAgICB9LCAxMClcbiAgfVxufVxuXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXdQcm9wcykge1xuICAgIGNvbnN0IHtmb2N1c2VkR3JvdXBQYWdlLCBmb2N1c2VkR3JvdXBRdWVyeX0gPSBuZXdQcm9wc1xuXG4gICAgaWYgKGZvY3VzZWRHcm91cFBhZ2UgIT09IHRoaXMucHJvcHMuZm9jdXNlZEdyb3VwUGFnZSB8fCBmb2N1c2VkR3JvdXBRdWVyeSAhPT0gdGhpcy5wcm9wcy5mb2N1c2VkR3JvdXBRdWVyeSkge1xuICAgICAgaWYgKGZvY3VzZWRHcm91cFBhZ2UpIHtcbiAgICAgICAgbGV0IHNlbGVjdG9yUXVlcnkgPSBgLnBhZ2Uke2ZvY3VzZWRHcm91cFBhZ2V9YFxuICAgICAgICBpZiAoZm9jdXNlZEdyb3VwUXVlcnkpIHtcbiAgICAgICAgICBzZWxlY3RvclF1ZXJ5ID0gYCR7c2VsZWN0b3JRdWVyeX0uJHtmb2N1c2VkR3JvdXBRdWVyeS5yZXBsYWNlKC9cXHMvZywgJ18nKS5yZXBsYWNlKC9cIi9nLCAnJyl9YFxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHNlbGVjdG9yUXVlcnkpXG4gICAgICAgIGNvbnN0IG1hdGNoaW5nRWxlbWVudHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yUXVlcnkpKVxuICAgICAgICBjb25zdCB0b3BNYXRjaGluZ0VsZW1lbnQgPSBtYXRjaGluZ0VsZW1lbnRzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICByZXR1cm4gYS5vZmZzZXRUb3AgLSBiLm9mZnNldFRvcFxuICAgICAgICB9KVswXVxuXG4gICAgICAgIHNjcm9sbFRvKHRoaXMuX21haW4sIHRvcE1hdGNoaW5nRWxlbWVudC5vZmZzZXRUb3AsIDIwMClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsTW91bnQgKCkge1xuICAgIGNvbnN0IHtkaXNwYXRjaH0gPSB0aGlzLnByb3BzXG5cbiAgICBzb2NrZXQuZW1pdCgnZ2V0IHN0dWR5JylcblxuICAgIHNvY2tldC5vbignc3R1ZHknLCAoZGF0YSkgPT4ge1xuICAgICAgZGlzcGF0Y2gocmVjZWl2ZVN0dWR5KGRhdGEucGFydGljaXBhbnRJZCwgZGF0YS5zZXNzaW9uSWQsIGRhdGEuY29uZGl0aW9uLCBkYXRhLnRhc2tBbGlhcykpXG4gICAgICBzb2NrZXQuZW1pdCgnZ2V0IGRhdGEnLCB7c2Vzc2lvbklkOiBkYXRhLnRyYWluaW5nID8gJ3Rlc3QnIDogZGF0YS5zZXNzaW9uSWQsIHRhc2tBbGlhczogZGF0YS50YXNrQWxpYXN9KVxuICAgIH0pXG5cbiAgICBzb2NrZXQub24oJ2NvbmZpcm0ga2lsbCBzdHVkeScsICgpID0+IHtcbiAgICAgIGRpc3BhdGNoKGtpbGxTdHVkeSgpKVxuICAgIH0pXG5cbiAgICBzb2NrZXQub24oJ2NvbmZpcm0gY3JlYXRlIGV4YW1wbGUnLCBlID0+IHtcbiAgICAgIGRpc3BhdGNoKHJlY2VpdmVFeGFtcGxlKGUpKVxuICAgIH0pXG5cbiAgICBzb2NrZXQub24oJ2NvbmZpcm0gY3JlYXRlIHF1ZXJ5JywgcSA9PiB7XG4gICAgICBkaXNwYXRjaChyZWNlaXZlUXVlcnkocSkpXG4gICAgfSlcblxuICAgIHNvY2tldC5vbignZGF0YScsIChkYXRhKSA9PiB7XG4gICAgICBkaXNwYXRjaChyZWNlaXZlRGF0YShkYXRhLnF1ZXJpZXMsIGRhdGEuZXhhbXBsZXMsIGRhdGEudGFzaykpXG4gICAgfSlcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3Qge2NvbmRpdGlvbn0gPSB0aGlzLnByb3BzXG5cbiAgICBsZXQgc2lkZWJhckVsID0gJydcbiAgICBpZiAoY29uZGl0aW9uID09PSAnc3lzdGVtJykge1xuICAgICAgc2lkZWJhckVsID0gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLkFwcFNpZGViYXJ9PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuQXBwU2lkZWJhcl9faGVhZGluZ30+XG4gICAgICAgICAgICA8VGl0bGUgdGl0bGU9XCJDb2xsZWN0aW9uIFN1bW1hcnlcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5BcHBTaWRlYmFyX19zZWN0aW9ufT5cbiAgICAgICAgICAgIDxTdW1tYXJ5IC8+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLkFwcFNpZGViYXJfX2hlYWRpbmd9PlxuICAgICAgICAgICAgPFRpdGxlIHRpdGxlPVwiU2VhcmNoIEhpc3RvcnlcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Ake3N0eWxlcy5BcHBTaWRlYmFyX19zZWN0aW9ufSAke3N0eWxlcy5BcHBTaWRlYmFyX19zZWN0aW9uX2Z1bGx9YH0+XG4gICAgICAgICAgICA8UXVlcnlMaXN0IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKVxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLkFwcH0+XG4gICAgICAgIHtzaWRlYmFyRWx9XG5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHJlZj17KGVsKSA9PiB7IHRoaXMuX21haW4gPSBlbCB9fVxuICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLkFwcF9fbWFpbn0+XG4gICAgICAgICAgPENvbGxlY3Rpb25WaWV3IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXG4gIHN0YXRlID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgc2Vzc2lvbklkOiBzdGF0ZS5zdHVkeS5zZXNzaW9uSWQsXG4gICAgICBjb25kaXRpb246IHN0YXRlLnN0dWR5LmNvbmRpdGlvbixcbiAgICAgIGZvY3VzZWRHcm91cFBhZ2U6IHN0YXRlLnVpLmZvY3VzZWRHcm91cFBhZ2UsXG4gICAgICBmb2N1c2VkR3JvdXBRdWVyeTogc3RhdGUudWkuZm9jdXNlZEdyb3VwUXVlcnlcbiAgICB9XG4gIH1cbikoQXBwKVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2NvbXBvbmVudHMvQXBwL0FwcC5qc3hcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJBcHBcIjpcIkFwcF9fQXBwX19fbEJFWElcIixcIkFwcF9fbWFpblwiOlwiQXBwX19BcHBfX21haW5fX18yVlpqaVwiLFwiQXBwU2lkZWJhclwiOlwiQXBwX19BcHBTaWRlYmFyX19fd1h2RjRcIixcIkFwcFNpZGViYXJfX2hlYWRpbmdcIjpcIkFwcF9fQXBwU2lkZWJhcl9faGVhZGluZ19fX25aMzFtXCIsXCJBcHBTaWRlYmFyX19zZWN0aW9uXCI6XCJBcHBfX0FwcFNpZGViYXJfX3NlY3Rpb25fX19RWnVDRFwiLFwiQXBwU2lkZWJhcl9fc2VjdGlvbl9mdWxsXCI6XCJBcHBfX0FwcFNpZGViYXJfX3NlY3Rpb25fZnVsbF9fXzItTy03XCJ9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9BcHAvQXBwLmNzc1xuICoqIG1vZHVsZSBpZCA9IDQ5NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL1F1ZXJ5TGlzdC5jc3MnXG5pbXBvcnQgUXVlcnkgZnJvbSAnLi4vUXVlcnknXG5pbXBvcnQgTGlzdCBmcm9tICcuLi8uLi9sYXlvdXRzL0xpc3QnXG5cbmNsYXNzIFF1ZXJ5TGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3Qge3F1ZXJpZXN9ID0gdGhpcy5wcm9wc1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxMaXN0XG4gICAgICAgIG49ezEuNX1cbiAgICAgICAgaXRlbXM9e3F1ZXJpZXMubWFwKChxLCBpbmRleCkgPT5cbiAgICAgICAgICAgIDxRdWVyeVxuICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICBxdWVyeT17cX0gLz5cbiAgICAgICAgKX0gLz5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcbiAgc3RhdGUgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBxdWVyaWVzOiBbLi4uc3RhdGUuZGF0YS5xdWVyaWVzXS5zb3J0KChhLCBiKSA9PiBiLmV4YW1wbGVzQ291bnQgLSBhLmV4YW1wbGVzQ291bnQpXG4gICAgfVxuICB9XG4pKFF1ZXJ5TGlzdClcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jb21wb25lbnRzL1F1ZXJ5TGlzdC9RdWVyeUxpc3QuanN4XG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiUXVlcnlMaXN0XCI6XCJRdWVyeUxpc3RfX1F1ZXJ5TGlzdF9fXzJIY2dMXCJ9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9RdWVyeUxpc3QvUXVlcnlMaXN0LmNzc1xuICoqIG1vZHVsZSBpZCA9IDQ5N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL1F1ZXJ5LmNzcydcbmltcG9ydCBNZWRpYSBmcm9tICcuLi8uLi9sYXlvdXRzL01lZGlhJ1xuaW1wb3J0IEZsZXggZnJvbSAnLi4vLi4vbGF5b3V0cy9GbGV4J1xuaW1wb3J0IEV4YW1wbGVzQmFyIGZyb20gJy4uL0V4YW1wbGVzQmFyJ1xuaW1wb3J0IEJsb2NrIGZyb20gJy4uLy4uL2xheW91dHMvQmxvY2snXG5cbmNvbnN0IFF1ZXJ5ID0gKHtcbiAgcXVlcnksXG4gIGV4YW1wbGVzXG59KSA9PiB7XG4gIGxldCBzZWFyY2hSZXN1bHRzQ2hhcnREYXRhID0gW1xuICAgIHtcbiAgICAgIGxhYmVsOiAnMTArJyxcbiAgICAgIHBhZ2U6IDEwLFxuICAgICAgZXhhbXBsZXM6IGV4YW1wbGVzLmZpbHRlcihlID0+IGUucmVsZXZhbmNlID09PSAxMClcbiAgICB9XG4gIF1cbiAgZm9yIChsZXQgaSA9IDk7IGkgPiAwOyBpLS0pIHtcbiAgICBzZWFyY2hSZXN1bHRzQ2hhcnREYXRhID0gW1xuICAgICAge1xuICAgICAgICBsYWJlbDogYCR7aX1gLFxuICAgICAgICBwYWdlOiBpLFxuICAgICAgICBleGFtcGxlczogZXhhbXBsZXMuZmlsdGVyKGUgPT4gZS5yZWxldmFuY2UgPT09IGkpXG4gICAgICB9LFxuICAgICAgLi4uc2VhcmNoUmVzdWx0c0NoYXJ0RGF0YVxuICAgIF1cbiAgfVxuXG4gIGNvbnN0IHNlYXJjaFJlc3VsdHNDaGFydCA9IChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnFDaGFydH0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnFDaGFydF9fdGl0bGV9PlNlYXJjaCBSZXN1bHQgUGFnZXM8L2Rpdj5cblxuICAgICAgPEJsb2NrIG49ezAuNX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMucUNoYXJ0X19jYW52YXN9PlxuICAgICAgICAgIHtzZWFyY2hSZXN1bHRzQ2hhcnREYXRhLm1hcCgocywgaW5kZXgpID0+XG4gICAgICAgICAgICA8RXhhbXBsZXNCYXJcbiAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgcXVlcnk9e3F1ZXJ5LnF1ZXJ5fVxuICAgICAgICAgICAgICBwYWdlPXtzLnBhZ2V9XG4gICAgICAgICAgICAgIGxhYmVsPXtzLmxhYmVsfVxuICAgICAgICAgICAgICBleGFtcGxlcz17ZXhhbXBsZXMuZmlsdGVyKGUgPT4gZS5yZWxldmFuY2UgPT09IHMucGFnZSl9IC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L0Jsb2NrPlxuICAgIDwvZGl2PlxuICApXG5cbiAgY29uc3QgcmVsYXRlZEltYWdlc0NoYXJ0ID0gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMucUNoYXJ0fT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMucUNoYXJ0X190aXRsZX0+UmVsYXRlZCBJbWFnZXM8L2Rpdj5cblxuICAgICAgPEJsb2NrIG49ezAuNX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMucUNoYXJ0X19jYW52YXN9PlxuICAgICAgICAgIDxFeGFtcGxlc0JhclxuICAgICAgICAgICAgcXVlcnk9e3F1ZXJ5LnF1ZXJ5fVxuICAgICAgICAgICAgcGFnZT17LTF9XG4gICAgICAgICAgICB0aGVtZT1cImFjY2VudDJcIlxuICAgICAgICAgICAgZXhhbXBsZXM9e2V4YW1wbGVzLmZpbHRlcihlID0+IGUucmVsZXZhbmNlID09PSAtMSl9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9CbG9jaz5cbiAgICA8L2Rpdj5cbiAgKVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5RdWVyeX0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLlF1ZXJ5X19oZWFkZXJ9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnFIZWFkZXJ9PlxuICAgICAgICAgIDxGbGV4XG4gICAgICAgICAgICBhbGlnbkl0ZW1zPVwiY2VudGVyXCJcbiAgICAgICAgICAgIGp1c3RpZnlDb250ZW50PVwic3BhY2UtYmV0d2VlblwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5xSGVhZGVyX19xdWVyeX0+e3F1ZXJ5LnF1ZXJ5fTwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnFIZWFkZXJfX2V4YW1wbGVzQ291bnR9PntxdWVyeS5leGFtcGxlc0NvdW50fSBleGFtcGxlKHMpPC9kaXY+XG4gICAgICAgICAgPC9GbGV4PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7cXVlcnkuZXhhbXBsZXNDb3VudFxuICAgICAgICA/IDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuUXVlcnlfX2JvZHl9PlxuICAgICAgICAgIDxNZWRpYVxuICAgICAgICAgICAgYWxpZ25JdGVtcz1cInN0cmV0Y2hcIlxuICAgICAgICAgICAgZmlndXJlPXtzZWFyY2hSZXN1bHRzQ2hhcnR9XG4gICAgICAgICAgICBib2R5PXtyZWxhdGVkSW1hZ2VzQ2hhcnR9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA6ICcnXG4gICAgICB9XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcbiAgKHN0YXRlLCBvd25Qcm9wcykgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBleGFtcGxlczogc3RhdGUuZGF0YS5leGFtcGxlcy5maWx0ZXIoZSA9PiBlLnF1ZXJ5ID09PSBvd25Qcm9wcy5xdWVyeS5xdWVyeSlcbiAgICB9XG4gIH1cbikoUXVlcnkpXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvY29tcG9uZW50cy9RdWVyeS9RdWVyeS5qc3hcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJRdWVyeVwiOlwiUXVlcnlfX1F1ZXJ5X19fMzJ5VlBcIixcIlF1ZXJ5X19oZWFkZXJcIjpcIlF1ZXJ5X19RdWVyeV9faGVhZGVyX19fX0NNUmdcIixcIlF1ZXJ5X19ib2R5XCI6XCJRdWVyeV9fUXVlcnlfX2JvZHlfX18zd2pMWFwiLFwicUhlYWRlclwiOlwiUXVlcnlfX3FIZWFkZXJfX18xdkg4SFwiLFwicUhlYWRlcl9fcXVlcnlcIjpcIlF1ZXJ5X19xSGVhZGVyX19xdWVyeV9fX0FuZVZoXCIsXCJxSGVhZGVyX19leGFtcGxlc0NvdW50XCI6XCJRdWVyeV9fcUhlYWRlcl9fZXhhbXBsZXNDb3VudF9fXzF4X1NYXCIsXCJxQ2hhcnRcIjpcIlF1ZXJ5X19xQ2hhcnRfX19Fak5WNlwiLFwicUNoYXJ0X190aXRsZVwiOlwiUXVlcnlfX3FDaGFydF9fdGl0bGVfX19oTl90b1wiLFwicUNoYXJ0X19jYW52YXNcIjpcIlF1ZXJ5X19xQ2hhcnRfX2NhbnZhc19fXzFrbklwXCJ9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9RdWVyeS9RdWVyeS5jc3NcbiAqKiBtb2R1bGUgaWQgPSA0OTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuY29uc3QgYmFzZWxpbmUgPSAwLjc1MFxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL01lZGlhLmNzcydcblxuY29uc3QgTWVkaWFCb2R5ID0gKHtcbiAgY29udGVudFxufSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWVkaWFfX2JvZHl9PlxuICAgICAge2NvbnRlbnR9XG4gICAgPC9kaXY+XG4gIClcbn1cblxuY29uc3QgTWVkaWFGaWd1cmUgPSAoe1xuICBuLFxuICBjb250ZW50LFxuICByZXZlcnNlID0gZmFsc2Vcbn0pID0+IHtcbiAgbGV0IHN0eWxlID0ge31cbiAgaWYgKHJldmVyc2UpIHtcbiAgICBzdHlsZS5tYXJnaW5MZWZ0ID0gYCR7YmFzZWxpbmUgKiBufXJlbWBcbiAgfSBlbHNlIHtcbiAgICBzdHlsZS5tYXJnaW5SaWdodCA9IGAke2Jhc2VsaW5lICogbn1yZW1gXG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3N0eWxlfSBjbGFzc05hbWU9e3N0eWxlcy5tZWRpYV9fZmlndXJlfT5cbiAgICAgIHtjb250ZW50fVxuICAgIDwvZGl2PlxuICApXG59XG5cbmNvbnN0IE1lZGlhID0gKHtcbiAgZmlndXJlLFxuICBib2R5LFxuICBuID0gMSxcbiAgcmV2ZXJzZSA9IGZhbHNlLFxuICBhbGlnbkl0ZW1zID0gJ2ZsZXgtc3RhcnQnXG59KSA9PiB7XG4gIGNvbnN0IHN0eWxlID0ge1xuICAgIGFsaWduSXRlbXNcbiAgfVxuXG4gIGNvbnN0IGZpZ3VyZUVsZW1lbnQgPSAoXG4gICAgPE1lZGlhRmlndXJlXG4gICAgICBjb250ZW50PXtmaWd1cmV9XG4gICAgICByZXZlcnNlPXtyZXZlcnNlfVxuICAgICAgbj17bn0gLz5cbiAgKVxuXG4gIGNvbnN0IGJvZHlFbGVtZW50ID0gKFxuICAgIDxNZWRpYUJvZHlcbiAgICAgIGNvbnRlbnQ9e2JvZHl9IC8+XG4gIClcblxuICBpZiAocmV2ZXJzZSkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXtzdHlsZX0gY2xhc3NOYW1lPXtzdHlsZXMubWVkaWF9PlxuICAgICAgICB7Ym9keUVsZW1lbnR9XG4gICAgICAgIHtmaWd1cmVFbGVtZW50fVxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXtzdHlsZX0gY2xhc3NOYW1lPXtzdHlsZXMubWVkaWF9PlxuICAgICAgICB7ZmlndXJlRWxlbWVudH1cbiAgICAgICAge2JvZHlFbGVtZW50fVxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1lZGlhXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvbGF5b3V0cy9NZWRpYS9NZWRpYS5qc3hcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJtZWRpYVwiOlwiTWVkaWFfX21lZGlhX19fOUVBaWhcIixcIm1lZGlhX19maWd1cmVcIjpcIk1lZGlhX19tZWRpYV9fZmlndXJlX19fMW1zYUdcIixcIm1lZGlhX19ib2R5XCI6XCJNZWRpYV9fbWVkaWFfX2JvZHlfX18xVlpmTVwifTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2xheW91dHMvTWVkaWEvTWVkaWEuY3NzXG4gKiogbW9kdWxlIGlkID0gNTAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmNvbnN0IEZsZXggPSAoe1xuICBmbGV4RGlyZWN0aW9uID0gJ3JvdycsXG4gIGp1c3RpZnlDb250ZW50ID0gJ2ZsZXgtc3RhcnQnLFxuICBhbGlnbkl0ZW1zID0gJ2NlbnRlcicsXG4gIGNoaWxkcmVuXG59KSA9PiB7XG4gIGNvbnN0IHN0eWxlID0ge1xuICAgIGZsZXhEaXJlY3Rpb24sXG4gICAgYWxpZ25JdGVtcyxcbiAgICBqdXN0aWZ5Q29udGVudCxcbiAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgd2lkdGg6ICcxMDAlJyxcbiAgICBoZWlnaHQ6ICcxMDAlJ1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IHN0eWxlPXtzdHlsZX0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgRmxleFxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2xheW91dHMvRmxleC9GbGV4LmpzeFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnXG5cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9FeGFtcGxlc0Jhci5jc3MnXG5pbXBvcnQgRXhhbXBsZXNCYXJJdGVtIGZyb20gJy4uL0V4YW1wbGVzQmFySXRlbSdcbmltcG9ydCB7dG9nZ2xlRm9jdXNFeGFtcGxlR3JvdXB9IGZyb20gJy4uLy4uL3N0b3JlL3VpQWN0aW9ucydcblxuY29uc3QgRXhhbXBsZXNCYXIgPSAoe1xuICBleGFtcGxlcyxcbiAgcXVlcnksXG4gIHBhZ2UsXG4gIGxhYmVsID0gJycsXG4gIGZvY3VzZWRHcm91cFBhZ2UsXG4gIGZvY3VzZWRHcm91cFF1ZXJ5LFxuICB0b2dnbGVGb2N1c0V4YW1wbGVHcm91cFxufSkgPT4ge1xuICBsZXQgY2xhc3NOYW1lcyA9IFtzdHlsZXMuRXhhbXBsZXNCYXJdXG4gIGlmIChmb2N1c2VkR3JvdXBQYWdlKSB7XG4gICAgaWYgKGZvY3VzZWRHcm91cFF1ZXJ5ICYmIGZvY3VzZWRHcm91cFF1ZXJ5ICE9PSBxdWVyeSB8fCBmb2N1c2VkR3JvdXBQYWdlICE9PSBwYWdlKSB7XG4gICAgICBjbGFzc05hbWVzLnB1c2goc3R5bGVzLkV4YW1wbGVzQmFyX2RpbW1lZClcbiAgICB9XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIG9uQ2xpY2s9e3RvZ2dsZUZvY3VzRXhhbXBsZUdyb3VwfVxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzLmpvaW4oJyAnKX0+XG4gICAgICB7ZXhhbXBsZXMubWFwKChlLCBpbmRleCkgPT5cbiAgICAgICAgPEV4YW1wbGVzQmFySXRlbVxuICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgZXhhbXBsZT17ZX0gLz5cbiAgICAgICl9XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuRXhhbXBsZXNCYXJfX2xhYmVsfT57bGFiZWx9PC9kaXY+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcbiAgc3RhdGUgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBmb2N1c2VkR3JvdXBQYWdlOiBzdGF0ZS51aS5mb2N1c2VkR3JvdXBQYWdlLFxuICAgICAgZm9jdXNlZEdyb3VwUXVlcnk6IHN0YXRlLnVpLmZvY3VzZWRHcm91cFF1ZXJ5XG4gICAgfVxuICB9LFxuICAoZGlzcGF0Y2gsIG93blByb3BzKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRvZ2dsZUZvY3VzRXhhbXBsZUdyb3VwOiAoKSA9PiB7XG4gICAgICAgIGRpc3BhdGNoKHRvZ2dsZUZvY3VzRXhhbXBsZUdyb3VwKG93blByb3BzLnF1ZXJ5LCBvd25Qcm9wcy5wYWdlKSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbikoRXhhbXBsZXNCYXIpXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvY29tcG9uZW50cy9FeGFtcGxlc0Jhci9FeGFtcGxlc0Jhci5qc3hcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJFeGFtcGxlc0JhclwiOlwiRXhhbXBsZXNCYXJfX0V4YW1wbGVzQmFyX19fMkJhOC1cIixcIkV4YW1wbGVzQmFyX19sYWJlbFwiOlwiRXhhbXBsZXNCYXJfX0V4YW1wbGVzQmFyX19sYWJlbF9fXzE0Q2wxXCIsXCJFeGFtcGxlc0Jhcl9kaW1tZWRcIjpcIkV4YW1wbGVzQmFyX19FeGFtcGxlc0Jhcl9kaW1tZWRfX18xbkZFQlwifTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvRXhhbXBsZXNCYXIvRXhhbXBsZXNCYXIuY3NzXG4gKiogbW9kdWxlIGlkID0gNTA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4J1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vRXhhbXBsZXNCYXJJdGVtLmNzcydcbmltcG9ydCB7aGlnaGxpZ2h0RXhhbXBsZX0gZnJvbSAnLi4vLi4vc3RvcmUvdWlBY3Rpb25zJ1xuXG5jb25zdCBFeGFtcGxlc0Jhckl0ZW0gPSAoe1xuICBleGFtcGxlLFxuICBoaWdobGlnaHRlZEV4YW1wbGVJZCxcbiAgaGlnaGxpZ2h0RXhhbXBsZSxcbiAgZGltRXhhbXBsZVxufSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIG9uTW91c2VFbnRlcj17aGlnaGxpZ2h0RXhhbXBsZX1cbiAgICAgIG9uTW91c2VMZWF2ZT17ZGltRXhhbXBsZX1cbiAgICAgIGNsYXNzTmFtZT17YCR7c3R5bGVzLkV4YW1wbGVzQmFySXRlbX0gJHtoaWdobGlnaHRlZEV4YW1wbGVJZCA9PT0gZXhhbXBsZS5faWQgPyBzdHlsZXMuRXhhbXBsZXNCYXJJdGVtX2hpZ2hsaWdodGVkIDogJyd9YH0gLz5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxuICBzdGF0ZSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGhpZ2hsaWdodGVkRXhhbXBsZUlkOiBzdGF0ZS51aS5oaWdobGlnaHRlZEV4YW1wbGVJZFxuICAgIH1cbiAgfSxcbiAgKGRpc3BhdGNoLCBvd25Qcm9wcykgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBoaWdobGlnaHRFeGFtcGxlOiAoKSA9PiB7XG4gICAgICAgIGRpc3BhdGNoKGhpZ2hsaWdodEV4YW1wbGUob3duUHJvcHMuZXhhbXBsZS5faWQpKVxuICAgICAgfSxcbiAgICAgIGRpbUV4YW1wbGU6ICgpID0+IHtcbiAgICAgICAgZGlzcGF0Y2goaGlnaGxpZ2h0RXhhbXBsZShudWxsKSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbikoRXhhbXBsZXNCYXJJdGVtKVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2NvbXBvbmVudHMvRXhhbXBsZXNCYXJJdGVtL0V4YW1wbGVzQmFySXRlbS5qc3hcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJFeGFtcGxlc0Jhckl0ZW1cIjpcIkV4YW1wbGVzQmFySXRlbV9fRXhhbXBsZXNCYXJJdGVtX19fSzBHRWNcIn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL0V4YW1wbGVzQmFySXRlbS9FeGFtcGxlc0Jhckl0ZW0uY3NzXG4gKiogbW9kdWxlIGlkID0gNTA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnQgY29uc3QgVE9HR0xFX0ZPQ1VTX0VYQU1QTEVfR1JPVVAgPSAnVE9HR0xFX0ZPQ1VTX0VYQU1QTEVfR1JPVVAnXG5leHBvcnQgY29uc3QgSElHSExJR0hUX0VYQU1QTEUgPSAnSElHSExJR0hUX0VYQU1QTEUnXG5cbmV4cG9ydCBjb25zdCBoaWdobGlnaHRFeGFtcGxlID0gKGlkKSA9PiB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogSElHSExJR0hUX0VYQU1QTEUsXG4gICAgaWRcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgdG9nZ2xlRm9jdXNFeGFtcGxlR3JvdXAgPSAocXVlcnksIHBhZ2UpID0+IHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBUT0dHTEVfRk9DVVNfRVhBTVBMRV9HUk9VUCxcbiAgICBxdWVyeSxcbiAgICBwYWdlXG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9zdG9yZS91aUFjdGlvbnMuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmNvbnN0IGJhc2VsaW5lID0gMC43NTBcblxuY29uc3QgQmxvY2sgPSAoe1xuICBuID0gMSxcbiAgZXh0cmFDbGFzc05hbWVzID0gJycsXG4gIGNoaWxkcmVuXG59KSA9PiB7XG4gIGNvbnN0IHN0eWxlID0ge1xuICAgIG1hcmdpbkJvdHRvbTogYCR7YmFzZWxpbmUgKiBufXJlbWBcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17c3R5bGV9IGNsYXNzTmFtZT17ZXh0cmFDbGFzc05hbWVzfT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBCbG9ja1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2xheW91dHMvQmxvY2svQmxvY2suanN4XG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5jb25zdCBiYXNlbGluZSA9IDAuNzUwXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vTGlzdC5jc3MnXG5cbmNvbnN0IExpc3RJdGVtID0gKHtcbiAgbiA9IDEsXG4gIGl0ZW1cbn0pID0+IHtcbiAgY29uc3Qgc3R5bGUgPSB7XG4gICAgbWFyZ2luQm90dG9tOiBgJHtiYXNlbGluZSAqIG59cmVtYFxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8bGkgc3R5bGU9e3N0eWxlfSBjbGFzc05hbWU9e3N0eWxlcy5saXN0X19pdGVtfT5cbiAgICAgIHtpdGVtfVxuICAgIDwvbGk+XG4gIClcbn1cblxuY29uc3QgTGlzdCA9ICh7XG4gIGl0ZW1zLFxuICBuID0gMSxcbiAgYWxpZ25JdGVtcyA9ICdmbGV4LXN0YXJ0JyxcbiAganVzdGlmeUNvbnRlbnQgPSAnZmxleC1zdGFydCdcbn0pID0+IHtcbiAgY29uc3Qgc3R5bGUgPSB7XG4gICAgbWFyZ2luQm90dG9tOiBgLSR7YmFzZWxpbmUgKiBufXJlbWAsXG4gICAgYWxpZ25JdGVtcyxcbiAgICBqdXN0aWZ5Q29udGVudFxuICB9XG5cbiAgY29uc3QgbGlzdEl0ZW1zID0gaXRlbXMubWFwKChpLCBpbmRleCkgPT5cbiAgICA8TGlzdEl0ZW0ga2V5PXtpbmRleH0gaXRlbT17aX0gbj17bn0gLz5cbiAgKVxuXG4gIHJldHVybiAoXG4gICAgPHVsIHN0eWxlPXtzdHlsZX0gY2xhc3NOYW1lPXtzdHlsZXMubGlzdH0+XG4gICAgICB7bGlzdEl0ZW1zfVxuICAgIDwvdWw+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgTGlzdFxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2xheW91dHMvTGlzdC9MaXN0LmpzeFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcImxpc3RcIjpcIkxpc3RfX2xpc3RfX18ySG8telwiLFwibGlzdF9faXRlbVwiOlwiTGlzdF9fbGlzdF9faXRlbV9fX0t2ZHI2XCJ9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvbGF5b3V0cy9MaXN0L0xpc3QuY3NzXG4gKiogbW9kdWxlIGlkID0gNTEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4J1xuXG5pbXBvcnQgRXhhbXBsZUxpc3QgZnJvbSAnLi4vRXhhbXBsZUxpc3QnXG5cbmNvbnN0IENvbGxlY3Rpb25WaWV3ID0gKHtcbiAgZXhhbXBsZXNcbn0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8RXhhbXBsZUxpc3RcbiAgICAgIG5Db2xzPXs1fVxuICAgICAgZXhhbXBsZXM9e2V4YW1wbGVzfSAvPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXG4gIHN0YXRlID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgZXhhbXBsZXM6IFsuLi5zdGF0ZS5kYXRhLmV4YW1wbGVzXS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgIGlmIChiLmNyZWF0ZWRBdCA+IGEuY3JlYXRlZEF0KSB7XG4gICAgICAgICAgcmV0dXJuIC0xXG4gICAgICAgIH0gZWxzZSBpZiAoYS5jcmVhdGVkQXQgPj0gYi5jcmVhdGVkQXQpIHtcbiAgICAgICAgICByZXR1cm4gMVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuKShDb2xsZWN0aW9uVmlldylcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jb21wb25lbnRzL0NvbGxlY3Rpb25WaWV3L0NvbGxlY3Rpb25WaWV3LmpzeFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL0V4YW1wbGVMaXN0LmNzcydcbmltcG9ydCBFeGFtcGxlIGZyb20gJy4uL0V4YW1wbGUnXG5cbmNsYXNzIEV4YW1wbGVMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7ZXhhbXBsZXMsIG5Db2xzfSA9IHRoaXMucHJvcHNcbiAgICBjb25zdCBjb2x1bW5zID0gW11cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbkNvbHM7IGkrKykge1xuICAgICAgY29uc3QgY29sdW1uID0gZXhhbXBsZXMuZmlsdGVyKChlLCBpbmRleCkgPT4ge1xuICAgICAgICByZXR1cm4gaW5kZXggJSBuQ29scyA9PT0gaVxuICAgICAgfSlcblxuICAgICAgY29sdW1ucy5wdXNoKGNvbHVtbilcbiAgICB9XG5cbiAgICBsZXQgY2xhc3NOYW1lcyA9IFtzdHlsZXMuRXhhbXBsZUxpc3RdXG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMuam9pbignICcpfT5cbiAgICAgICAge2NvbHVtbnMubWFwKChjb2x1bW4sIGkpID0+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuRXhhbXBsZUxpc3RfX2NvbHVtbn0+XG4gICAgICAgICAgICB7Y29sdW1uLm1hcCgoZXhhbXBsZSwgaikgPT5cbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGtleT17an1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5FeGFtcGxlTGlzdF9fZXhhbXBsZX0+XG4gICAgICAgICAgICAgICAgPEV4YW1wbGVcbiAgICAgICAgICAgICAgICAgIGNvbXBhY3Q9e25Db2xzID4gNX1cbiAgICAgICAgICAgICAgICAgIGV4YW1wbGU9e2V4YW1wbGV9IC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX08L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFeGFtcGxlTGlzdFxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2NvbXBvbmVudHMvRXhhbXBsZUxpc3QvRXhhbXBsZUxpc3QuanN4XG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiRXhhbXBsZUxpc3RcIjpcIkV4YW1wbGVMaXN0X19FeGFtcGxlTGlzdF9fXzc0SmMzXCIsXCJFeGFtcGxlTGlzdF9fY29sdW1uXCI6XCJFeGFtcGxlTGlzdF9fRXhhbXBsZUxpc3RfX2NvbHVtbl9fXzNGemtXXCIsXCJFeGFtcGxlTGlzdF9fZXhhbXBsZVwiOlwiRXhhbXBsZUxpc3RfX0V4YW1wbGVMaXN0X19leGFtcGxlX19fM2VqTF9cIn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL0V4YW1wbGVMaXN0L0V4YW1wbGVMaXN0LmNzc1xuICoqIG1vZHVsZSBpZCA9IDUxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL0V4YW1wbGUuY3NzJ1xuXG5jb25zdCBFeGFtcGxlID0gKHtcbiAgZXhhbXBsZSxcbiAgZm9jdXNlZEdyb3VwUGFnZSxcbiAgZm9jdXNlZEdyb3VwUXVlcnksXG4gIGhpZ2hsaWdodGVkRXhhbXBsZUlkXG59KSA9PiB7XG4gIGxldCBjbGFzc05hbWVzID0gW3N0eWxlcy5FeGFtcGxlLCBleGFtcGxlLnF1ZXJ5LnJlcGxhY2UoL1xccy9nLCAnXycpLnJlcGxhY2UoL1wiL2csICcnKSwgYHBhZ2Uke2V4YW1wbGUucmVsZXZhbmNlfWBdXG4gIGlmIChmb2N1c2VkR3JvdXBQYWdlKSB7XG4gICAgaWYgKGZvY3VzZWRHcm91cFF1ZXJ5ICYmIGZvY3VzZWRHcm91cFF1ZXJ5ICE9PSBleGFtcGxlLnF1ZXJ5KSB7XG4gICAgICBjbGFzc05hbWVzLnB1c2goc3R5bGVzLkV4YW1wbGVfZGltbWVkKVxuICAgIH0gZWxzZSBpZiAoZm9jdXNlZEdyb3VwUGFnZSAhPT0gZXhhbXBsZS5yZWxldmFuY2UpIHtcbiAgICAgIGNsYXNzTmFtZXMucHVzaChzdHlsZXMuRXhhbXBsZV9kaW1tZWQpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNsYXNzTmFtZXMucHVzaChzdHlsZXMuRXhhbXBsZV9mb2N1c2VkKVxuICAgIH1cbiAgfVxuXG4gIGlmIChoaWdobGlnaHRlZEV4YW1wbGVJZCA9PT0gZXhhbXBsZS5faWQpIHtcbiAgICBjbGFzc05hbWVzLnB1c2goc3R5bGVzLkV4YW1wbGVfaGlnaGxpZ2h0ZWQpXG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGlkPXtleGFtcGxlLl9pZH1cbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5qb2luKCcgJyl9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5FeGFtcGxlX19pbWFnZVdyYXBwZXJ9PlxuICAgICAgICA8aW1nXG4gICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuRXhhbXBsZV9faW1hZ2V9XG4gICAgICAgICAgc3JjPXtleGFtcGxlLmV4YW1wbGUuc3JjfSAvPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuRXhhbXBsZV9fZGVzY3JpcHRpb25PdmVybGF5fT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5FeGFtcGxlX19kZXNjcmlwdGlvbn0+XG4gICAgICAgICAge2V4YW1wbGUuaW1hZ2VEZXNjcmlwdGlvbn1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxuICAoc3RhdGUsIG93blByb3BzKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGZvY3VzZWRHcm91cFBhZ2U6IHN0YXRlLnVpLmZvY3VzZWRHcm91cFBhZ2UsXG4gICAgICBmb2N1c2VkR3JvdXBRdWVyeTogc3RhdGUudWkuZm9jdXNlZEdyb3VwUXVlcnksXG4gICAgICBoaWdobGlnaHRlZEV4YW1wbGVJZDogc3RhdGUudWkuaGlnaGxpZ2h0ZWRFeGFtcGxlSWRcbiAgICB9XG4gIH1cbikoRXhhbXBsZSlcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jb21wb25lbnRzL0V4YW1wbGUvRXhhbXBsZS5qc3hcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJFeGFtcGxlXCI6XCJFeGFtcGxlX19FeGFtcGxlX19fMjdTMGlcIixcIkV4YW1wbGVfX2ltYWdlV3JhcHBlclwiOlwiRXhhbXBsZV9fRXhhbXBsZV9faW1hZ2VXcmFwcGVyX19fMUwtejVcIixcIkV4YW1wbGVfX2ltYWdlXCI6XCJFeGFtcGxlX19FeGFtcGxlX19pbWFnZV9fXzNZZDYxXCIsXCJFeGFtcGxlX19kZXNjcmlwdGlvbk92ZXJsYXlcIjpcIkV4YW1wbGVfX0V4YW1wbGVfX2Rlc2NyaXB0aW9uT3ZlcmxheV9fXzJVekMzXCIsXCJFeGFtcGxlX19kZXNjcmlwdGlvblwiOlwiRXhhbXBsZV9fRXhhbXBsZV9fZGVzY3JpcHRpb25fX18xUldoclwiLFwiRXhhbXBsZV9kaW1tZWRcIjpcIkV4YW1wbGVfX0V4YW1wbGVfZGltbWVkX19fMnNUZllcIixcIkV4YW1wbGVfZm9jdXNlZFwiOlwiRXhhbXBsZV9fRXhhbXBsZV9mb2N1c2VkX19fMzZyeDBcIn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL0V4YW1wbGUvRXhhbXBsZS5jc3NcbiAqKiBtb2R1bGUgaWQgPSA1MTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnXG5cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9TdW1tYXJ5LmNzcydcbmltcG9ydCBNZWRpYSBmcm9tICcuLi8uLi9sYXlvdXRzL01lZGlhJ1xuaW1wb3J0IEZsZXggZnJvbSAnLi4vLi4vbGF5b3V0cy9GbGV4J1xuaW1wb3J0IEV4YW1wbGVzQmFyIGZyb20gJy4uL0V4YW1wbGVzQmFyJ1xuaW1wb3J0IEJsb2NrIGZyb20gJy4uLy4uL2xheW91dHMvQmxvY2snXG5cbmNvbnN0IFN1bW1hcnkgPSAoe1xuICBxdWVyaWVzQ291bnQsXG4gIGV4YW1wbGVzXG59KSA9PiB7XG4gIGxldCBzZWFyY2hSZXN1bHRzQ2hhcnREYXRhID0gW1xuICAgIHtcbiAgICAgIGxhYmVsOiAnMTArJyxcbiAgICAgIHBhZ2U6IDEwLFxuICAgICAgZXhhbXBsZXM6IGV4YW1wbGVzLmZpbHRlcihlID0+IGUucmVsZXZhbmNlID09PSAxMClcbiAgICB9XG4gIF1cbiAgZm9yIChsZXQgaSA9IDk7IGkgPiAwOyBpLS0pIHtcbiAgICBzZWFyY2hSZXN1bHRzQ2hhcnREYXRhID0gW1xuICAgICAge1xuICAgICAgICBsYWJlbDogYCR7aX1gLFxuICAgICAgICBwYWdlOiBpLFxuICAgICAgICBleGFtcGxlczogZXhhbXBsZXMuZmlsdGVyKGUgPT4gZS5yZWxldmFuY2UgPT09IGkpXG4gICAgICB9LFxuICAgICAgLi4uc2VhcmNoUmVzdWx0c0NoYXJ0RGF0YVxuICAgIF1cbiAgfVxuXG4gIGNvbnN0IHNlYXJjaFJlc3VsdHNDaGFydCA9IChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnNDaGFydH0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnNDaGFydF9fdGl0bGV9PlNlYXJjaCBSZXN1bHQgUGFnZXM8L2Rpdj5cblxuICAgICAgPEJsb2NrIG49ezAuNX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuc0NoYXJ0X19jYW52YXN9PlxuICAgICAgICAgIHtzZWFyY2hSZXN1bHRzQ2hhcnREYXRhLm1hcCgocywgaW5kZXgpID0+XG4gICAgICAgICAgICA8RXhhbXBsZXNCYXJcbiAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgcXVlcnk9e251bGx9XG4gICAgICAgICAgICAgIHBhZ2U9e3MucGFnZX1cbiAgICAgICAgICAgICAgbGFiZWw9e3MubGFiZWx9XG4gICAgICAgICAgICAgIGV4YW1wbGVzPXtleGFtcGxlcy5maWx0ZXIoZSA9PiBlLnJlbGV2YW5jZSA9PT0gcy5wYWdlKX0gLz5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvQmxvY2s+XG4gICAgPC9kaXY+XG4gIClcblxuICBjb25zdCByZWxhdGVkSW1hZ2VzQ2hhcnQgPSAoXG4gICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5zQ2hhcnR9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5zQ2hhcnRfX3RpdGxlfT5SZWxhdGVkIEltYWdlczwvZGl2PlxuXG4gICAgICA8QmxvY2sgbj17MC41fT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5zQ2hhcnRfX2NhbnZhc30+XG4gICAgICAgICAgPEV4YW1wbGVzQmFyXG4gICAgICAgICAgICBxdWVyeT17bnVsbH1cbiAgICAgICAgICAgIHBhZ2U9ey0xfVxuICAgICAgICAgICAgdGhlbWU9XCJhY2NlbnQyXCJcbiAgICAgICAgICAgIGV4YW1wbGVzPXtleGFtcGxlcy5maWx0ZXIoZSA9PiBlLnJlbGV2YW5jZSA9PT0gLTEpfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvQmxvY2s+XG4gICAgPC9kaXY+XG4gIClcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuU3VtbWFyeX0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLlN1bW1hcnlfX2hlYWRlcn0+XG4gICAgICAgIDxGbGV4XG4gICAgICAgICAgYWxpZ25JdGVtcz1cImNlbnRlclwiXG4gICAgICAgICAganVzdGlmeUNvbnRlbnQ9XCJjZW50ZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnNIZWFkZXJ9PlxuICAgICAgICAgICAgPE1lZGlhXG4gICAgICAgICAgICAgIGFsaWduSXRlbXM9XCJjZW50ZXJcIlxuICAgICAgICAgICAgICBmaWd1cmU9ezxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuc0hlYWRlcl9fY291bnRlcn0+e3F1ZXJpZXNDb3VudH08L2Rpdj59XG4gICAgICAgICAgICAgIGJvZHk9ezxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuc0hlYWRlcl9fYm9keX0+c2VhcmNoIHF1ZXJpZXM8L2Rpdj59IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5zSGVhZGVyfT5cbiAgICAgICAgICAgIDxNZWRpYVxuICAgICAgICAgICAgICBhbGlnbkl0ZW1zPVwiY2VudGVyXCJcbiAgICAgICAgICAgICAgZmlndXJlPXs8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnNIZWFkZXJfX2NvdW50ZXJ9PntleGFtcGxlcy5sZW5ndGh9PC9kaXY+fVxuICAgICAgICAgICAgICBib2R5PXs8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLnNIZWFkZXJfX2JvZHl9PmV4YW1wbGVzIGNvbGxlY3RlZDwvZGl2Pn0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9GbGV4PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuU3VtbWFyeV9fYm9keX0+XG4gICAgICAgIDxNZWRpYVxuICAgICAgICAgIGFsaWduSXRlbXM9XCJzdHJldGNoXCJcbiAgICAgICAgICBmaWd1cmU9e3NlYXJjaFJlc3VsdHNDaGFydH1cbiAgICAgICAgICBib2R5PXtyZWxhdGVkSW1hZ2VzQ2hhcnR9IC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxuICBzdGF0ZSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHF1ZXJpZXNDb3VudDogc3RhdGUuZGF0YS5xdWVyaWVzLmxlbmd0aCxcbiAgICAgIGV4YW1wbGVzOiBzdGF0ZS5kYXRhLmV4YW1wbGVzXG4gICAgfVxuICB9XG4pKFN1bW1hcnkpXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvY29tcG9uZW50cy9TdW1tYXJ5L1N1bW1hcnkuanN4XG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiU3VtbWFyeVwiOlwiU3VtbWFyeV9fU3VtbWFyeV9fXzJ2YlFZXCIsXCJTdW1tYXJ5X19oZWFkZXJcIjpcIlN1bW1hcnlfX1N1bW1hcnlfX2hlYWRlcl9fXzFXdnZNXCIsXCJTdW1tYXJ5X19ib2R5XCI6XCJTdW1tYXJ5X19TdW1tYXJ5X19ib2R5X19fM0YzLWJcIixcInNIZWFkZXJcIjpcIlN1bW1hcnlfX3NIZWFkZXJfX18zLUxvV1wiLFwic0hlYWRlcl9fY291bnRlclwiOlwiU3VtbWFyeV9fc0hlYWRlcl9fY291bnRlcl9fXzNaZ3FuXCIsXCJzSGVhZGVyX19ib2R5XCI6XCJTdW1tYXJ5X19zSGVhZGVyX19ib2R5X19fMzZFRUJcIixcInNDaGFydFwiOlwiU3VtbWFyeV9fc0NoYXJ0X19fM0lwV0NcIixcInNDaGFydF9fdGl0bGVcIjpcIlN1bW1hcnlfX3NDaGFydF9fdGl0bGVfX18ySFY2SVwiLFwic0NoYXJ0X19jYW52YXNcIjpcIlN1bW1hcnlfX3NDaGFydF9fY2FudmFzX19fMXc5bllcIn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL1N1bW1hcnkvU3VtbWFyeS5jc3NcbiAqKiBtb2R1bGUgaWQgPSA1MTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL1RpdGxlLmNzcydcblxuY29uc3QgVGl0bGUgPSAoe1xuICB0aXRsZVxufSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuVGl0bGV9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5UaXRsZV9fdGV4dH0+e3RpdGxlfTwvZGl2PlxuICAgIDwvZGl2PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IFRpdGxlXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvY29tcG9uZW50cy9UaXRsZS9UaXRsZS5qc3hcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJUaXRsZVwiOlwiVGl0bGVfX1RpdGxlX19fMTdCdUtcIixcIlRpdGxlX190ZXh0XCI6XCJUaXRsZV9fVGl0bGVfX3RleHRfX18xVHNIalwifTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvVGl0bGUvVGl0bGUuY3NzXG4gKiogbW9kdWxlIGlkID0gNTE5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgaW8gZnJvbSAnc29ja2V0LmlvLWNsaWVudCdcblxuY29uc3Qgc29ja2V0ID0gaW8oJ2h0dHBzOi8vdmR6aXViYWsuY29tLycsIHtwYXRoOiAnL2Rlc2lnbkZpeGF0aW9uU2VydmVyJ30pXG5cbmV4cG9ydCBkZWZhdWx0IHNvY2tldFxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL3N0b3JlL3NvY2tldC5qc1xuICoqLyIsImV4cG9ydCBjb25zdCBSRUNFSVZFX0RBVEEgPSAnUkVDRUlWRV9EQVRBJ1xuZXhwb3J0IGNvbnN0IFJFQ0VJVkVfRVhBTVBMRSA9ICdSRUNFSVZFX0VYQU1QTEUnXG5leHBvcnQgY29uc3QgUkVDRUlWRV9RVUVSWSA9ICdSRUNFSVZFX1FVRVJZJ1xuZXhwb3J0IGNvbnN0IElOQ19FWEFNUExFX0NPVU5URVIgPSAnSU5DX0VYQU1QTEVfQ09VTlRFUidcblxuZXhwb3J0IGNvbnN0IHJlY2VpdmVFeGFtcGxlID0gKGV4YW1wbGUpID0+IHtcbiAgcmV0dXJuIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBjb25zb2xlLmxvZyhleGFtcGxlKVxuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IElOQ19FWEFNUExFX0NPVU5URVIsXG4gICAgICBxdWVyeTogZXhhbXBsZS5xdWVyeVxuICAgIH0pXG5cbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBSRUNFSVZFX0VYQU1QTEUsXG4gICAgICBleGFtcGxlXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgcmVjZWl2ZVF1ZXJ5ID0gKHF1ZXJ5KSA9PiB7XG4gIHJldHVybiBkaXNwYXRjaCA9PiB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogUkVDRUlWRV9RVUVSWSxcbiAgICAgIHF1ZXJ5OiBPYmplY3QuYXNzaWduKHt9LCBxdWVyeSwge1xuICAgICAgICBleGFtcGxlc0NvdW50OiAwXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHJlY2VpdmVEYXRhID0gKHF1ZXJpZXMsIGV4YW1wbGVzKSA9PiB7XG4gIHJldHVybiBkaXNwYXRjaCA9PiB7XG4gICAgY29uc3QgZW5oYW5jZWRRdWVyaWVzID0gcXVlcmllcy5tYXAoKHEsIGluZGV4KSA9PiBPYmplY3QuYXNzaWduKHt9LCBxLCB7XG4gICAgICBleGFtcGxlc0NvdW50OiBleGFtcGxlcy5maWx0ZXIoZSA9PiBlLnF1ZXJ5ID09PSBxLnF1ZXJ5KS5sZW5ndGhcbiAgICB9KSlcblxuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFJFQ0VJVkVfREFUQSxcbiAgICAgIHF1ZXJpZXM6IGVuaGFuY2VkUXVlcmllcyxcbiAgICAgIGV4YW1wbGVzXG4gICAgfSlcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL3N0b3JlL2RhdGFBY3Rpb25zLmpzXG4gKiovIiwiZXhwb3J0IGNvbnN0IFJFQ0VJVkVfU1RVRFkgPSAnUkVDRUlWRV9TVFVEWSdcbmV4cG9ydCBjb25zdCBLSUxMX1NUVURZID0gJ0tJTExfU1RVRFknXG5cbmV4cG9ydCBjb25zdCByZWNlaXZlU3R1ZHkgPSAoXG4gIHBhcnRpY2lwYW50SWQsXG4gIHNlc3Npb25JZCxcbiAgY29uZGl0aW9uLFxuICB0YXNrQWxpYXNcbikgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IFJFQ0VJVkVfU1RVRFksXG4gICAgcGFydGljaXBhbnRJZCxcbiAgICBzZXNzaW9uSWQsXG4gICAgY29uZGl0aW9uLFxuICAgIHRhc2tBbGlhc1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBraWxsU3R1ZHkgPSAoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogS0lMTF9TVFVEWVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvc3RvcmUvc3R1ZHlBY3Rpb25zLmpzXG4gKiovIiwiaW1wb3J0IHtjcmVhdGVTdG9yZSwgYXBwbHlNaWRkbGV3YXJlfSBmcm9tICdyZWR1eCdcbmltcG9ydCBjcmVhdGVMb2dnZXIgZnJvbSAncmVkdXgtbG9nZ2VyJ1xuaW1wb3J0IHRodW5rTWlkZGxld2FyZSBmcm9tICdyZWR1eC10aHVuaydcbmltcG9ydCByb290UmVkdWNlciBmcm9tICcuL3Jvb3RSZWR1Y2VyJ1xuXG5jb25zdCBtaWRkbGV3YXJlID0gW3RodW5rTWlkZGxld2FyZV1cblxuLy8gaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4vLyAgIGNvbnN0IGxvZ2dlciA9IGNyZWF0ZUxvZ2dlcigpXG4vLyAgIG1pZGRsZXdhcmUucHVzaChsb2dnZXIpXG4vLyB9XG5cbmNvbnN0IGNvbmZpZ3VyZVN0b3JlID0gKGluaXRpYWxTdGF0ZSkgPT4ge1xuICByZXR1cm4gY3JlYXRlU3RvcmUoXG4gICAgcm9vdFJlZHVjZXIsXG4gICAgaW5pdGlhbFN0YXRlLFxuICAgIGFwcGx5TWlkZGxld2FyZSguLi5taWRkbGV3YXJlKVxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZ3VyZVN0b3JlXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvc3RvcmUvc3RvcmUuanNcbiAqKi8iLCJpbXBvcnQge2NvbWJpbmVSZWR1Y2Vyc30gZnJvbSAncmVkdXgnXG5pbXBvcnQgZGF0YSBmcm9tICcuL2RhdGFSZWR1Y2VyJ1xuaW1wb3J0IHVpIGZyb20gJy4vdWlSZWR1Y2VyJ1xuaW1wb3J0IHN0dWR5IGZyb20gJy4vc3R1ZHlSZWR1Y2VyJ1xuXG5jb25zdCByb290UmVkdWNlciA9IGNvbWJpbmVSZWR1Y2Vycyh7XG4gIGRhdGEsXG4gIHVpLFxuICBzdHVkeVxufSlcblxuZXhwb3J0IGRlZmF1bHQgcm9vdFJlZHVjZXJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9zdG9yZS9yb290UmVkdWNlci5qc1xuICoqLyIsImltcG9ydCB7XG4gIFJFQ0VJVkVfREFUQSxcbiAgUkVDRUlWRV9FWEFNUExFLFxuICBSRUNFSVZFX1FVRVJZLFxuICBJTkNfRVhBTVBMRV9DT1VOVEVSXG59IGZyb20gJy4vZGF0YUFjdGlvbnMnXG5pbXBvcnQgaW5pdGlhbFN0YXRlIGZyb20gJy4vaW5pdGlhbFN0YXRlJ1xuXG5jb25zdCBkYXRhID0gKFxuICBzdGF0ZSA9IGluaXRpYWxTdGF0ZS5kYXRhLFxuICBhY3Rpb25cbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBSRUNFSVZFX0RBVEE6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgcXVlcmllczogYWN0aW9uLnF1ZXJpZXMsXG4gICAgICAgIGV4YW1wbGVzOiBhY3Rpb24uZXhhbXBsZXNcbiAgICAgIH0pXG4gICAgY2FzZSBSRUNFSVZFX0VYQU1QTEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgZXhhbXBsZXM6IFtcbiAgICAgICAgICAuLi5zdGF0ZS5leGFtcGxlcyxcbiAgICAgICAgICBhY3Rpb24uZXhhbXBsZVxuICAgICAgICBdXG4gICAgICB9KVxuICAgIGNhc2UgUkVDRUlWRV9RVUVSWTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBxdWVyaWVzOiBbXG4gICAgICAgICAgLi4uc3RhdGUucXVlcmllcyxcbiAgICAgICAgICBhY3Rpb24ucXVlcnlcbiAgICAgICAgXVxuICAgICAgfSlcbiAgICBjYXNlIElOQ19FWEFNUExFX0NPVU5URVI6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgcXVlcmllczogc3RhdGUucXVlcmllcy5tYXAocSA9PiB7XG4gICAgICAgICAgaWYgKHEucXVlcnkgPT09IGFjdGlvbi5xdWVyeSkge1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHEsIHtcbiAgICAgICAgICAgICAgZXhhbXBsZXNDb3VudDogcS5leGFtcGxlc0NvdW50ICsgMVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHFcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBkYXRhXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvc3RvcmUvZGF0YVJlZHVjZXIuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCB7XG4gIGRhdGE6IHtcbiAgICBxdWVyaWVzOiBbXSxcbiAgICBleGFtcGxlczogW11cbiAgfSxcbiAgdWk6IHtcbiAgICBmb2N1c2VkR3JvdXBQYWdlOiBudWxsLFxuICAgIGZvY3VzZWRHcm91cFF1ZXJ5OiBudWxsLFxuICAgIGhpZ2hsaWdodGVkRXhhbXBsZUlkOiBudWxsXG4gIH0sXG4gIHN0dWR5OiB7XG4gICAgcGFydGljaXBhbnRJZDogJycsXG4gICAgc2Vzc2lvbklkOiBudWxsLFxuICAgIGNvbmRpdGlvbjogJ2Jhc2VsaW5lJyxcbiAgICB0YXNrQWxpYXM6ICcnXG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9zdG9yZS9pbml0aWFsU3RhdGUuanNcbiAqKi8iLCJpbXBvcnQge1xuICBUT0dHTEVfRk9DVVNfRVhBTVBMRV9HUk9VUCxcbiAgSElHSExJR0hUX0VYQU1QTEVcbn0gZnJvbSAnLi91aUFjdGlvbnMnXG5pbXBvcnQgaW5pdGlhbFN0YXRlIGZyb20gJy4vaW5pdGlhbFN0YXRlJ1xuXG5jb25zdCB1aSA9IChcbiAgc3RhdGUgPSBpbml0aWFsU3RhdGUudWksXG4gIGFjdGlvblxuKSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIFRPR0dMRV9GT0NVU19FWEFNUExFX0dST1VQOlxuICAgICAgaWYgKGFjdGlvbi5wYWdlID09PSBzdGF0ZS5mb2N1c2VkR3JvdXBQYWdlICYmIGFjdGlvbi5xdWVyeSA9PT0gc3RhdGUuZm9jdXNlZEdyb3VwUXVlcnkpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgZm9jdXNlZEdyb3VwUGFnZTogbnVsbCxcbiAgICAgICAgICBmb2N1c2VkR3JvdXBRdWVyeTogbnVsbFxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgZm9jdXNlZEdyb3VwUGFnZTogYWN0aW9uLnBhZ2UsXG4gICAgICAgICAgZm9jdXNlZEdyb3VwUXVlcnk6IGFjdGlvbi5xdWVyeVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIGNhc2UgSElHSExJR0hUX0VYQU1QTEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgaGlnaGxpZ2h0ZWRFeGFtcGxlSWQ6IGFjdGlvbi5pZFxuICAgICAgfSlcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgdWlcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9zdG9yZS91aVJlZHVjZXIuanNcbiAqKi8iLCJpbXBvcnQge1JFQ0VJVkVfU1RVRFksIEtJTExfU1RVRFl9IGZyb20gJy4vc3R1ZHlBY3Rpb25zJ1xuaW1wb3J0IGluaXRpYWxTdGF0ZSBmcm9tICcuL2luaXRpYWxTdGF0ZSdcblxuY29uc3Qgc3R1ZHkgPSAoXG4gIHN0YXRlID0gaW5pdGlhbFN0YXRlLnN0dWR5LFxuICBhY3Rpb25cbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBSRUNFSVZFX1NUVURZOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHBhcnRpY2lwYW50SWQ6IGFjdGlvbi5wYXJ0aWNpcGFudElkLFxuICAgICAgICBzZXNzaW9uSWQ6IGFjdGlvbi5zZXNzaW9uSWQsXG4gICAgICAgIGNvbmRpdGlvbjogYWN0aW9uLmNvbmRpdGlvbixcbiAgICAgICAgdGFza0FsaWFzOiBhY3Rpb24udGFza0FsaWFzXG4gICAgICB9KVxuICAgIGNhc2UgS0lMTF9TVFVEWTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBzZXNzaW9uSWQ6IG51bGxcbiAgICAgIH0pXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0dWR5XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvc3RvcmUvc3R1ZHlSZWR1Y2VyLmpzXG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3N0eWxlcy9yZXNldC5jc3NcbiAqKiBtb2R1bGUgaWQgPSA1NzlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBREE7Ozs7Ozs7Ozs7Ozs7OztBQ2JBO0FBQ0E7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFBQTtBQUNBO0FBQUE7QUFDQTs7Ozs7Ozs7O0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBVkE7QUFXQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBSUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUlBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFiQTtBQWtCQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBSEE7QUFIQTtBQVVBOzs7O0FBckZBO0FBQ0E7QUF1RkE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTs7Ozs7OztBQzVIQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNEQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7OztBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBSEE7QUFNQTs7OztBQWJBO0FBQ0E7QUFlQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBREE7QUFHQTs7Ozs7OztBQzVCQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7QUFDQTtBQUdBO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUhBO0FBQ0E7QUFIQTtBQVNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUhBO0FBVkE7QUFDQTtBQU9BO0FBQUE7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQU5BO0FBREE7QUFEQTtBQUhBO0FBQ0E7QUFpQkE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBTEE7QUFEQTtBQUhBO0FBQ0E7QUFjQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUxBO0FBREE7QUFEQTtBQVlBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFkQTtBQXdCQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQURBO0FBR0E7Ozs7Ozs7QUNsR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ0RBO0FBQ0E7OztBQUVBO0FBQ0E7Ozs7O0FBRkE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUlBO0FBQ0E7QUFDQTtBQUlBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFJQTtBQUNBO0FBQ0E7QUFNQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3pFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTs7Ozs7QUFDQTtBQUtBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBQ0E7QUFRQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBSUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUN2QkE7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUNBO0FBUUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFIQTtBQU1BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFUQTtBQVlBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7Ozs7Ozs7QUNuREE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ0RBO0FBQ0E7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFDQTtBQUtBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFEQTtBQUdBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQVFBOzs7Ozs7O0FDbkNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7Ozs7Ozs7Ozs7Ozs7QUNoQkE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFJQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ25CQTtBQUNBOzs7QUFFQTtBQUNBOzs7OztBQUZBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFJQTtBQUNBO0FBQ0E7QUFLQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUNBO0FBS0E7QUFBQTtBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBSUE7QUFDQTs7Ozs7Ozs7QUMxQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ0RBO0FBQ0E7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBU0E7Ozs7Ozs7Ozs7Ozs7OztBQzFCQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7OztBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFDQTtBQUdBO0FBQUE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBREE7QUFIQTtBQURBO0FBREE7QUFpQkE7Ozs7QUFqQ0E7QUFDQTtBQW1DQTs7Ozs7OztBQ3pDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBQ0E7QUFLQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBTUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQURBO0FBVEE7QUFnQkE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBOzs7Ozs7O0FDcERBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNEQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7OztBQUNBO0FBR0E7QUFBQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBSEE7QUFDQTtBQUhBO0FBU0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBSEE7QUFWQTtBQUNBO0FBT0E7QUFBQTtBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBTkE7QUFEQTtBQURBO0FBSEE7QUFDQTtBQWlCQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFMQTtBQURBO0FBSEE7QUFDQTtBQWNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFKQTtBQU1BO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUpBO0FBVEE7QUFEQTtBQW1CQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBcEJBO0FBNEJBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7Ozs7Ozs7QUN2R0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ0RBO0FBQ0E7OztBQUNBO0FBQ0E7Ozs7O0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBSUE7QUFDQTs7Ozs7Ozs7QUNiQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTs7Ozs7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQURBO0FBQUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTs7Ozs7Ozs7Ozs7OztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7Ozs7Ozs7Ozs7Ozs7QUN0QkE7QUFDQTtBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNuQkE7QUFDQTtBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUNBO0FBS0E7Ozs7Ozs7Ozs7Ozs7OztBQ1hBO0FBQ0E7QUFLQTtBQUNBOzs7Ozs7O0FBQ0E7QUFHQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFEQTtBQU1BO0FBQ0E7QUFDQTtBQURBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFDQTtBQWpDQTtBQW1DQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBVkE7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFHQTtBQUNBOzs7OztBQUNBO0FBR0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFsQkE7QUFvQkE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQy9CQTtBQUNBO0FBQUE7QUFDQTs7Ozs7QUFDQTtBQUdBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFiQTtBQWVBO0FBQ0E7Ozs7Ozs7O0FDdkJBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==