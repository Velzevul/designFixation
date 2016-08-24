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

	var _store = __webpack_require__(574);

	var _store2 = _interopRequireDefault(_store);

	var _reactRedux = __webpack_require__(472);

	__webpack_require__(582);

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

	var _TaskDescription = __webpack_require__(496);

	var _TaskDescription2 = _interopRequireDefault(_TaskDescription);

	var _QueryList = __webpack_require__(498);

	var _QueryList2 = _interopRequireDefault(_QueryList);

	var _KeywordList = __webpack_require__(503);

	var _KeywordList2 = _interopRequireDefault(_KeywordList);

	var _CollectionView = __webpack_require__(507);

	var _CollectionView2 = _interopRequireDefault(_CollectionView);

	var _KeywordView = __webpack_require__(512);

	var _KeywordView2 = _interopRequireDefault(_KeywordView);

	var _QueryView = __webpack_require__(517);

	var _QueryView2 = _interopRequireDefault(_QueryView);

	var _Title = __webpack_require__(519);

	var _Title2 = _interopRequireDefault(_Title);

	var _Flex = __webpack_require__(521);

	var _Flex2 = _interopRequireDefault(_Flex);

	var _socket = __webpack_require__(522);

	var _socket2 = _interopRequireDefault(_socket);

	var _dataActions = __webpack_require__(571);

	var _uiActions = __webpack_require__(502);

	var _studyActions = __webpack_require__(573);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var App = function (_React$Component) {
	  _inherits(App, _React$Component);

	  function App() {
	    _classCallCheck(this, App);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(App).apply(this, arguments));
	  }

	  _createClass(App, [{
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
	      var _props = this.props;
	      var focusedQueries = _props.focusedQueries;
	      var focusedKeywords = _props.focusedKeywords;
	      var condition = _props.condition;
	      var dispatch = _props.dispatch;


	      var bodyEl = '';
	      if (focusedQueries.length > 0) {
	        bodyEl = _react2.default.createElement(_QueryView2.default, null);
	      } else if (focusedKeywords.length > 0) {
	        bodyEl = _react2.default.createElement(_KeywordView2.default, null);
	      } else {
	        bodyEl = _react2.default.createElement(_CollectionView2.default, null);
	      }

	      return _react2.default.createElement(
	        'div',
	        { className: _App2.default.App },
	        _react2.default.createElement(
	          'div',
	          { className: _App2.default.AppSidebar },
	          _react2.default.createElement(
	            'div',
	            { className: _App2.default.AppSidebar__title },
	            _react2.default.createElement(_Title2.default, { title: 'Design Task' })
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: _App2.default.AppSidebar__header },
	            _react2.default.createElement(_TaskDescription2.default, null)
	          ),
	          condition === 'system' ? _react2.default.createElement(
	            'div',
	            { className: _App2.default.AppSidebar__title },
	            _react2.default.createElement(
	              _Flex2.default,
	              {
	                alignItems: 'center',
	                justifyContent: 'space-between' },
	              _react2.default.createElement(_Title2.default, { title: 'Searches' }),
	              focusedQueries.length > 0 ? _react2.default.createElement(
	                'button',
	                {
	                  onClick: function onClick() {
	                    return dispatch((0, _uiActions.clearFocusedQueries)());
	                  },
	                  className: _App2.default.AppSidebar__clearFilters },
	                'clear all'
	              ) : ''
	            )
	          ) : '',
	          condition === 'system' ? _react2.default.createElement(
	            'div',
	            { className: _App2.default.AppSidebar__body },
	            _react2.default.createElement(_QueryList2.default, null)
	          ) : '',
	          condition === 'system' ? _react2.default.createElement(
	            'div',
	            { className: _App2.default.AppSidebar__title },
	            _react2.default.createElement(
	              _Flex2.default,
	              {
	                alignItems: 'center',
	                justifyContent: 'space-between' },
	              _react2.default.createElement(_Title2.default, { title: 'Common Keywords' }),
	              focusedKeywords.length > 0 ? _react2.default.createElement(
	                'button',
	                {
	                  onClick: function onClick() {
	                    return dispatch((0, _uiActions.clearFocusedKeywords)());
	                  },
	                  className: _App2.default.AppSidebar__clearFilters },
	                'clear all'
	              ) : ''
	            )
	          ) : '',
	          condition === 'system' ? _react2.default.createElement(
	            'div',
	            { className: _App2.default.AppSidebar__body },
	            _react2.default.createElement(_KeywordList2.default, null)
	          ) : ''
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: _App2.default.App__main },
	          bodyEl
	        )
	      );
	    }
	  }]);

	  return App;
	}(_react2.default.Component);

	exports.default = (0, _reactRedux.connect)(function (state) {
	  return {
	    sessionId: state.study.sessionId,
	    taskAlias: state.study.taskAlias,
	    condition: state.study.condition,
	    focusedQueries: state.ui.focusedQueries,
	    focusedKeywords: state.ui.focusedKeywords
	  };
		})(App);

/***/ },

/***/ 495:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"App":"App__App___lBEXI","App__main":"App__App__main___2VZji","AppSidebar":"App__AppSidebar___wXvF4","AppSidebar__header":"App__AppSidebar__header___2WtqC","AppSidebar__body":"App__AppSidebar__body___ZdyV_","AppSidebar__title":"App__AppSidebar__title___12hSB","AppSidebar__clearFilters":"App__AppSidebar__clearFilters___ZDNIX"};

/***/ },

/***/ 496:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(472);

	var _TaskDescription = __webpack_require__(497);

	var _TaskDescription2 = _interopRequireDefault(_TaskDescription);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var TaskDescription = function TaskDescription(_ref) {
	  var task = _ref.task;
	  var focusedQueries = _ref.focusedQueries;

	  var queryTasks = focusedQueries.map(function (q, i) {
	    var matchedTask = q.matchedTask;

	    if (matchedTask) {
	      while (matchedTask.indexOf('<em>') !== -1) {
	        var insertPosition = matchedTask.indexOf('<em>') + 3;
	        var queryColor = 'rgba(' + q.color.slice(4, q.color.length - 1) + ', 0.3)';
	        matchedTask = matchedTask.slice(0, insertPosition) + ' style="background-color: ' + queryColor + ';" ' + matchedTask.slice(insertPosition);
	      }

	      return _react2.default.createElement('div', {
	        key: i,
	        className: _TaskDescription2.default.TaskDescription__query,
	        dangerouslySetInnerHTML: { __html: matchedTask } });
	    } else {
	      return '';
	    }
	  });

	  return _react2.default.createElement(
	    'div',
	    { className: _TaskDescription2.default.TaskDescription },
	    _react2.default.createElement(
	      'div',
	      { className: _TaskDescription2.default.TaskDescription__main },
	      task.text
	    ),
	    queryTasks
	  );
	};

	exports.default = (0, _reactRedux.connect)(function (state) {
	  return {
	    task: state.data.task || {},
	    focusedQueries: state.data.queries.filter(function (q) {
	      return state.ui.focusedQueries.indexOf(q.query) !== -1;
	    })
	  };
		})(TaskDescription);

/***/ },

/***/ 497:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"TaskDescription":"TaskDescription__TaskDescription___1tOK9","TaskDescription__main":"TaskDescription__TaskDescription__main___M3NIN","TaskDescription__query":"TaskDescription__TaskDescription__query___1h2qO"};

/***/ },

/***/ 498:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(472);

	var _QueryList = __webpack_require__(499);

	var _QueryList2 = _interopRequireDefault(_QueryList);

	var _Query = __webpack_require__(500);

	var _Query2 = _interopRequireDefault(_Query);

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


	      return _react2.default.createElement(
	        'div',
	        { className: _QueryList2.default.QueryList },
	        queries.map(function (q, index) {
	          return _react2.default.createElement(_Query2.default, {
	            key: index,
	            query: q });
	        })
	      );
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

/***/ 499:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"QueryList":"QueryList__QueryList___2HcgL"};

/***/ },

/***/ 500:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(472);

	var _Query = __webpack_require__(501);

	var _Query2 = _interopRequireDefault(_Query);

	var _uiActions = __webpack_require__(502);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Query = function Query(_ref) {
	  var query = _ref.query;
	  var focusedQueries = _ref.focusedQueries;
	  var toggleFocus = _ref.toggleFocus;

	  var style = {};
	  var classNames = [_Query2.default.Query];
	  if (focusedQueries.indexOf(query.query) !== -1) {
	    style.backgroundColor = 'rgba(' + query.color.slice(4, query.color.length - 1) + ', 0.3)';
	    classNames.push(_Query2.default.Query_isFocused);
	  }

	  return _react2.default.createElement(
	    'div',
	    {
	      onClick: toggleFocus,
	      style: style,
	      className: classNames.join(' ') },
	    query.query,
	    ' (',
	    query.examplesCount,
	    ')'
	  );
	};

	exports.default = (0, _reactRedux.connect)(function (state) {
	  return {
	    focusedQueries: state.ui.focusedQueries
	  };
	}, function (dispatch, ownProps) {
	  var query = ownProps.query.query;


	  return {
	    toggleFocus: function toggleFocus() {
	      dispatch((0, _uiActions.toggleFocusQuery)(query));
	    }
	  };
		})(Query);

/***/ },

/***/ 501:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"Query":"Query__Query___32yVP","Query_isFocused":"Query__Query_isFocused___3Yu6Z"};

/***/ },

/***/ 502:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var TOGGLE_HIGHLIGHT_QUERY = exports.TOGGLE_HIGHLIGHT_QUERY = 'TOGGLE_HIGHLIGHT_QUERY';
	var TOGGLE_FOCUS_QUERY = exports.TOGGLE_FOCUS_QUERY = 'TOGGLE_FOCUS_QUERY';
	var TOGGLE_FOCUS_KEYWORD = exports.TOGGLE_FOCUS_KEYWORD = 'TOGGLE_FOCUS_KEYWORD';
	var CLEAR_FOCUSED_QUERIES = exports.CLEAR_FOCUSED_QUERIES = 'CLEAR_FOCUSED_QUERIES';
	var CLEAR_FOCUSED_KEYWORDS = exports.CLEAR_FOCUSED_KEYWORDS = 'CLEAR_FOCUSED_KEYWORDS';

	var toggleHighlightQuery = exports.toggleHighlightQuery = function toggleHighlightQuery(query) {
	  return {
	    type: TOGGLE_HIGHLIGHT_QUERY,
	    query: query
	  };
	};

	var toggleFocusQuery = exports.toggleFocusQuery = function toggleFocusQuery(query) {
	  return {
	    type: TOGGLE_FOCUS_QUERY,
	    query: query
	  };
	};

	var toggleFocusKeyword = exports.toggleFocusKeyword = function toggleFocusKeyword(keyword) {
	  return {
	    type: TOGGLE_FOCUS_KEYWORD,
	    keyword: keyword
	  };
	};

	var clearFocusedQueries = exports.clearFocusedQueries = function clearFocusedQueries() {
	  return {
	    type: CLEAR_FOCUSED_QUERIES
	  };
	};

	var clearFocusedKeywords = exports.clearFocusedKeywords = function clearFocusedKeywords() {
	  return {
	    type: CLEAR_FOCUSED_KEYWORDS
	  };
		};

/***/ },

/***/ 503:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(472);

	var _KeywordList = __webpack_require__(504);

	var _KeywordList2 = _interopRequireDefault(_KeywordList);

	var _Keyword = __webpack_require__(505);

	var _Keyword2 = _interopRequireDefault(_Keyword);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var KeywordList = function (_React$Component) {
	  _inherits(KeywordList, _React$Component);

	  function KeywordList() {
	    _classCallCheck(this, KeywordList);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(KeywordList).apply(this, arguments));
	  }

	  _createClass(KeywordList, [{
	    key: 'render',
	    value: function render() {
	      var keywords = this.props.keywords;


	      return _react2.default.createElement(
	        'div',
	        { className: _KeywordList2.default.KeywordList },
	        keywords.map(function (k, index) {
	          return _react2.default.createElement(_Keyword2.default, {
	            key: index,
	            keyword: k });
	        })
	      );
	    }
	  }]);

	  return KeywordList;
	}(_react2.default.Component);

	exports.default = (0, _reactRedux.connect)(function (state) {
	  var queries = state.ui.focusedQueries.length ? state.ui.focusedQueries : state.data.queries.map(function (q) {
	    return q.query;
	  });
	  var examples = state.data.examples.filter(function (e) {
	    return queries.indexOf(e.query) !== -1;
	  });
	  var stems = examples.reduce(function (carry, current) {
	    return [].concat(_toConsumableArray(carry), _toConsumableArray(current.imageDescriptionStems));
	  }, []);

	  var keywords = [];
	  var stemIndexMap = {};

	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = stems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var stem = _step.value;

	      var stemIndex = stemIndexMap[stem];
	      if (stemIndex !== undefined) {
	        keywords[stemIndex].frequency += 1;
	      } else {
	        stemIndexMap[stem] = keywords.length;
	        keywords.push({
	          frequency: 1,
	          stem: stem
	        });
	      }
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }

	  return {
	    keywords: keywords.sort(function (a, b) {
	      return b.frequency - a.frequency;
	    })
	  };
		})(KeywordList);

/***/ },

/***/ 504:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"KeywordList":"KeywordList__KeywordList___E6go7"};

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

	var _Keyword = __webpack_require__(506);

	var _Keyword2 = _interopRequireDefault(_Keyword);

	var _uiActions = __webpack_require__(502);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Keyword = function Keyword(_ref) {
	  var keyword = _ref.keyword;
	  var focusedKeywords = _ref.focusedKeywords;
	  var toggleFocus = _ref.toggleFocus;
	  var stemDictionary = _ref.stemDictionary;

	  var classNames = [_Keyword2.default.Keyword];
	  if (focusedKeywords.indexOf(keyword.stem) !== -1) {
	    classNames.push(_Keyword2.default.Keyword_isFocused);
	  }

	  return _react2.default.createElement(
	    'div',
	    {
	      onClick: toggleFocus,
	      className: classNames.join(' ') },
	    stemDictionary[keyword.stem],
	    ' (',
	    keyword.frequency,
	    ')'
	  );
	};

	exports.default = (0, _reactRedux.connect)(function (state) {
	  return {
	    focusedKeywords: state.ui.focusedKeywords,
	    stemDictionary: state.data.stemDictionary
	  };
	}, function (dispatch, ownProps) {
	  var stem = ownProps.keyword.stem;


	  return {
	    toggleFocus: function toggleFocus() {
	      dispatch((0, _uiActions.toggleFocusKeyword)(stem));
	    }
	  };
		})(Keyword);

/***/ },

/***/ 506:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"Keyword":"Keyword__Keyword___2EkSY","Keyword_isFocused":"Keyword__Keyword_isFocused___w0MRS"};

/***/ },

/***/ 507:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(472);

	var _ExampleList = __webpack_require__(508);

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

/***/ 508:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _ExampleList = __webpack_require__(509);

	var _ExampleList2 = _interopRequireDefault(_ExampleList);

	var _Example = __webpack_require__(510);

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

/***/ 509:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"ExampleList":"ExampleList__ExampleList___74Jc3","ExampleList__column":"ExampleList__ExampleList__column___3FzkW","ExampleList__example":"ExampleList__ExampleList__example___3ejL_"};

/***/ },

/***/ 510:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(472);

	var _Example = __webpack_require__(511);

	var _Example2 = _interopRequireDefault(_Example);

	var _uiActions = __webpack_require__(502);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Example = function Example(_ref) {
	  var example = _ref.example;
	  var compact = _ref.compact;
	  var color = _ref.color;
	  var focusedQueries = _ref.focusedQueries;
	  var highlightedQuery = _ref.highlightedQuery;
	  var highlightQuery = _ref.highlightQuery;

	  var style = {};
	  var classNames = [_Example2.default.Example];
	  if (compact) {
	    classNames.push(_Example2.default.Example_compact);
	  }
	  if (focusedQueries.length > 1 && highlightedQuery === example.query) {
	    style.backgroundColor = 'rgba(' + color.slice(4, color.length - 1) + ', 0.3)';
	  }

	  return _react2.default.createElement(
	    'div',
	    {
	      onMouseEnter: highlightQuery,
	      onMouseLeave: highlightQuery,
	      style: style,
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
	      { className: _Example2.default.Example__description },
	      example.imageDescription
	    )
	  );
	};

	exports.default = (0, _reactRedux.connect)(function (state, ownProps) {
	  return {
	    focusedQueries: state.ui.focusedQueries,
	    highlightedQuery: state.ui.highlightedQuery,
	    color: state.data.queries.filter(function (q) {
	      return q.query === ownProps.example.query;
	    })[0].color
	  };
	}, function (dispatch, ownProps) {
	  return {
	    highlightQuery: function highlightQuery() {
	      var query = ownProps.example.query;


	      dispatch((0, _uiActions.toggleHighlightQuery)(query));
	    }
	  };
		})(Example);

/***/ },

/***/ 511:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"Example":"Example__Example___27S0i","Example__imageWrapper":"Example__Example__imageWrapper___1L-z5","Example__image":"Example__Example__image___3Yd61","Example__description":"Example__Example__description___1RWhr","Example_compact":"Example__Example_compact___2kYfJ"};

/***/ },

/***/ 512:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(472);

	var _KeywordView = __webpack_require__(513);

	var _KeywordView2 = _interopRequireDefault(_KeywordView);

	var _ExampleList = __webpack_require__(508);

	var _ExampleList2 = _interopRequireDefault(_ExampleList);

	var _KeywordExampleList = __webpack_require__(514);

	var _KeywordExampleList2 = _interopRequireDefault(_KeywordExampleList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var KeywordView = function KeywordView(_ref) {
	  var focusedKeywords = _ref.focusedKeywords;
	  var examples = _ref.examples;

	  var nonKeywordExamples = examples.filter(function (e) {
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = focusedKeywords[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var fk = _step.value;

	        if (e.imageDescriptionStems.indexOf(fk) !== -1) {
	          return false;
	        }
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }

	    return true;
	  });

	  return _react2.default.createElement(
	    'div',
	    { className: _KeywordView2.default.KeywordView },
	    focusedKeywords.map(function (k, index) {
	      return _react2.default.createElement(_KeywordExampleList2.default, {
	        key: index,
	        keyword: k,
	        examples: examples });
	    }),
	    _react2.default.createElement(_ExampleList2.default, {
	      nCols: 8,
	      examples: nonKeywordExamples })
	  );
	};

	exports.default = (0, _reactRedux.connect)(function (state) {
	  return {
	    examples: state.data.examples,
	    focusedKeywords: state.ui.focusedKeywords
	  };
		})(KeywordView);

/***/ },

/***/ 513:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"KeywordView":"KeywordView__KeywordView___23OIE"};

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

	var _KeywordExampleList = __webpack_require__(515);

	var _KeywordExampleList2 = _interopRequireDefault(_KeywordExampleList);

	var _ExampleList = __webpack_require__(508);

	var _ExampleList2 = _interopRequireDefault(_ExampleList);

	var _Block = __webpack_require__(516);

	var _Block2 = _interopRequireDefault(_Block);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var KeywordExampleList = function KeywordExampleList(_ref) {
	  var keyword = _ref.keyword;
	  var examples = _ref.examples;
	  var stemDictionary = _ref.stemDictionary;

	  var filteredExamples = examples.filter(function (e) {
	    return e.imageDescriptionStems.indexOf(keyword) !== -1;
	  });

	  if (filteredExamples.length) {
	    return _react2.default.createElement(
	      _Block2.default,
	      null,
	      _react2.default.createElement(
	        'div',
	        {
	          key: keyword,
	          className: _KeywordExampleList2.default.KeywordExampleList },
	        _react2.default.createElement(
	          'div',
	          { className: _KeywordExampleList2.default.KeywordExampleList__keyword },
	          stemDictionary[keyword]
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: _KeywordExampleList2.default.KeywordExampleList__examples },
	          _react2.default.createElement(_ExampleList2.default, {
	            nCols: 7,
	            examples: filteredExamples })
	        )
	      )
	    );
	  } else {
	    return _react2.default.createElement('span', null);
	  }
	};

	exports.default = (0, _reactRedux.connect)(function (state) {
	  return {
	    stemDictionary: state.data.stemDictionary
	  };
		})(KeywordExampleList);

/***/ },

/***/ 515:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"KeywordExampleList":"KeywordExampleList__KeywordExampleList___1E_11","KeywordExampleList__keyword":"KeywordExampleList__KeywordExampleList__keyword___3mv7N","KeywordExampleList__examples":"KeywordExampleList__KeywordExampleList__examples___2Qbfq"};

/***/ },

/***/ 516:
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

/***/ 517:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(472);

	var _QueryView = __webpack_require__(518);

	var _QueryView2 = _interopRequireDefault(_QueryView);

	var _ExampleList = __webpack_require__(508);

	var _ExampleList2 = _interopRequireDefault(_ExampleList);

	var _KeywordExampleList = __webpack_require__(514);

	var _KeywordExampleList2 = _interopRequireDefault(_KeywordExampleList);

	var _Block = __webpack_require__(516);

	var _Block2 = _interopRequireDefault(_Block);

	var _Title = __webpack_require__(519);

	var _Title2 = _interopRequireDefault(_Title);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var QueryView = function QueryView(_ref) {
	  var directExamples = _ref.directExamples;
	  var relatedExamples = _ref.relatedExamples;
	  var focusedKeywords = _ref.focusedKeywords;

	  var nonKeywordDirectExamples = directExamples.filter(function (e) {
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = focusedKeywords[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var fk = _step.value;

	        if (e.imageDescriptionStems.indexOf(fk) !== -1) {
	          return false;
	        }
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }

	    return true;
	  });

	  var directExamplesEl = '';
	  if (nonKeywordDirectExamples.length) {
	    directExamplesEl = _react2.default.createElement(_ExampleList2.default, {
	      nCols: 8,
	      examples: nonKeywordDirectExamples });
	  }

	  var nonKeywordRelatedExamples = relatedExamples.filter(function (e) {
	    var _iteratorNormalCompletion2 = true;
	    var _didIteratorError2 = false;
	    var _iteratorError2 = undefined;

	    try {
	      for (var _iterator2 = focusedKeywords[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	        var fk = _step2.value;

	        if (e.imageDescriptionStems.indexOf(fk) !== -1) {
	          return false;
	        }
	      }
	    } catch (err) {
	      _didIteratorError2 = true;
	      _iteratorError2 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion2 && _iterator2.return) {
	          _iterator2.return();
	        }
	      } finally {
	        if (_didIteratorError2) {
	          throw _iteratorError2;
	        }
	      }
	    }

	    return true;
	  });

	  var relatedExamplesEl = '';
	  if (nonKeywordRelatedExamples.length) {
	    relatedExamplesEl = _react2.default.createElement(_ExampleList2.default, {
	      nCols: 8,
	      examples: nonKeywordRelatedExamples });
	  }

	  return _react2.default.createElement(
	    'div',
	    { className: _QueryView2.default.QueryView },
	    _react2.default.createElement(
	      _Block2.default,
	      null,
	      _react2.default.createElement(
	        _Block2.default,
	        null,
	        _react2.default.createElement(_Title2.default, { title: 'Colected by browsing search results' })
	      ),
	      focusedKeywords.map(function (k, index) {
	        return _react2.default.createElement(_KeywordExampleList2.default, {
	          key: index,
	          keyword: k,
	          examples: directExamples });
	      }),
	      directExamplesEl
	    ),
	    _react2.default.createElement(
	      _Block2.default,
	      null,
	      _react2.default.createElement(_Title2.default, { title: 'Colected by browsing related images' })
	    ),
	    focusedKeywords.map(function (k, index) {
	      return _react2.default.createElement(_KeywordExampleList2.default, {
	        key: index,
	        keyword: k,
	        examples: relatedExamples });
	    }),
	    relatedExamplesEl
	  );
	};

	exports.default = (0, _reactRedux.connect)(function (state) {
	  var examples = state.data.examples.filter(function (e) {
	    return state.ui.focusedQueries.indexOf(e.query) !== -1;
	  });

	  return {
	    focusedKeywords: state.ui.focusedKeywords,
	    directExamples: examples.filter(function (e) {
	      return e.relevance > 0;
	    }).sort(function (a, b) {
	      if (a.query > b.query) {
	        return 1;
	      } else if (a.query < b.query) {
	        return -1;
	      } else {
	        if (a.createdAt > b.createdAt) {
	          return 1;
	        } else {
	          return -1;
	        }
	      }
	    }),
	    relatedExamples: examples.filter(function (e) {
	      return e.relevance === -1;
	    }).sort(function (a, b) {
	      if (a.query > b.query) {
	        return 1;
	      } else if (a.query < b.query) {
	        return -1;
	      } else {
	        if (a.createdAt > b.createdAt) {
	          return 1;
	        } else {
	          return -1;
	        }
	      }
	    })
	  };
		})(QueryView);

/***/ },

/***/ 518:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"QueryView":"QueryView__QueryView___3aonz"};

/***/ },

/***/ 519:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _Title = __webpack_require__(520);

	var _Title2 = _interopRequireDefault(_Title);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Title = function Title(_ref) {
	  var title = _ref.title;

	  return _react2.default.createElement(
	    'div',
	    { className: _Title2.default.Title },
	    title
	  );
	};

	exports.default = Title;

/***/ },

/***/ 520:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"Title":"Title__Title___17BuK"};

/***/ },

/***/ 521:
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

/***/ 522:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _socket = __webpack_require__(523);

	var _socket2 = _interopRequireDefault(_socket);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var socket = (0, _socket2.default)('https://vdziubak.com/', { path: '/designFixationServer' });

	exports.default = socket;

/***/ },

/***/ 571:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.receiveData = exports.receiveQuery = exports.receiveExample = exports.INC_EXAMPLE_COUNTER = exports.RECEIVE_QUERY = exports.RECEIVE_EXAMPLE = exports.RECEIVE_QUERY_TASK = exports.RECEIVE_DATA = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _randomcolor = __webpack_require__(572);

	var _randomcolor2 = _interopRequireDefault(_randomcolor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import algoliasearch from 'algoliasearch'
	//
	// const client = algoliasearch('74S1JNB1ZT', '3de6fdbafc477cf019673bb81043ae0d')
	// const index = client.initIndex('DesignFixationStudyTasks')

	var RECEIVE_DATA = exports.RECEIVE_DATA = 'RECEIVE_DATA';
	var RECEIVE_QUERY_TASK = exports.RECEIVE_QUERY_TASK = 'RECEIVE_QUERY_TASK';
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
	    console.log(query);
	    var color = (0, _randomcolor2.default)({
	      luminosity: 'bright',
	      format: 'rgb'
	    });

	    dispatch({
	      type: RECEIVE_QUERY,
	      query: _extends({}, query, {
	        examplesCount: 0,
	        color: color
	      })
	    });
	  };
	};

	var receiveData = exports.receiveData = function receiveData(queries, examples, task) {
	  return function (dispatch) {
	    var colors = (0, _randomcolor2.default)({
	      count: queries.length,
	      luminosity: 'bright',
	      format: 'rgb'
	    });

	    var enhancedQueries = queries.map(function (q, index) {
	      return _extends({}, q, {
	        examplesCount: examples.filter(function (e) {
	          return e.query === q.query;
	        }).length,
	        color: colors[index]
	      });
	    });

	    // for (let query of queries) {
	    //   index.search(query.query, (err, content) => {
	    //     if (content.hits.length) {
	    //       const matchedTask = content.hits.filter(h => h.taskAlias === task.alias)[0]
	    //
	    //       dispatch({
	    //         type: RECEIVE_QUERY_TASK,
	    //         matchedTask: matchedTask._highlightResult.text.value,
	    //         query: query.query
	    //       })
	    //     }
	    //   })
	    // }

	    dispatch({
	      type: RECEIVE_DATA,
	      queries: enhancedQueries,
	      examples: examples,
	      task: task
	    });
	  };
	};

/***/ },

/***/ 573:
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

/***/ 574:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(479);

	var _reduxLogger = __webpack_require__(575);

	var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

	var _reduxThunk = __webpack_require__(576);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _rootReducer = __webpack_require__(577);

	var _rootReducer2 = _interopRequireDefault(_rootReducer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var middleware = [_reduxThunk2.default];

	if (true) {
	  var logger = (0, _reduxLogger2.default)();
	  middleware.push(logger);
	}

	var configureStore = function configureStore(initialState) {
	  return (0, _redux.createStore)(_rootReducer2.default, initialState, _redux.applyMiddleware.apply(undefined, middleware));
	};

	exports.default = configureStore;

/***/ },

/***/ 577:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(479);

	var _dataReducer = __webpack_require__(578);

	var _dataReducer2 = _interopRequireDefault(_dataReducer);

	var _uiReducer = __webpack_require__(580);

	var _uiReducer2 = _interopRequireDefault(_uiReducer);

	var _studyReducer = __webpack_require__(581);

	var _studyReducer2 = _interopRequireDefault(_studyReducer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var rootReducer = (0, _redux.combineReducers)({
	  data: _dataReducer2.default,
	  ui: _uiReducer2.default,
	  study: _studyReducer2.default
	});

		exports.default = rootReducer;

/***/ },

/***/ 578:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _dataActions = __webpack_require__(571);

	var _initialState = __webpack_require__(579);

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
	        examples: action.examples,
	        task: action.task,
	        stemDictionary: action.examples.reduce(function (carry, current) {
	          return _extends({}, carry, current.stemDictionary);
	        }, state.stemDictionary)
	      });
	    case _dataActions.RECEIVE_EXAMPLE:
	      return _extends({}, state, {
	        examples: [].concat(_toConsumableArray(state.examples), [action.example]),
	        stemDictionary: _extends({}, state.stemDictionary, action.example.stemDictionary)
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
	    case _dataActions.RECEIVE_QUERY_TASK:
	      return _extends({}, state, {
	        queries: state.queries.map(function (q) {
	          if (q.query === action.query) {
	            return _extends({}, q, {
	              matchedTask: action.matchedTask
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

/***/ 579:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  data: {
	    queries: [],
	    examples: [],
	    task: {},
	    stemDictionary: {}
	  },
	  ui: {
	    highlightedQuery: null,
	    focusedQueries: [],
	    focusedKeywords: []
	  },
	  study: {
	    participantId: '',
	    sessionId: null,
	    condition: 'baseline',
	    taskAlias: ''
	  }
		};

/***/ },

/***/ 580:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _uiActions = __webpack_require__(502);

	var _initialState = __webpack_require__(579);

	var _initialState2 = _interopRequireDefault(_initialState);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var ui = function ui() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? _initialState2.default.ui : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case _uiActions.TOGGLE_HIGHLIGHT_QUERY:
	      return _extends({}, state, {
	        highlightedQuery: action.query === state.highlightedQuery ? null : action.query
	      });
	    case _uiActions.TOGGLE_FOCUS_QUERY:
	      var targetQueryIndex = state.focusedQueries.indexOf(action.query);
	      var focusedQueries = [];
	      if (targetQueryIndex === -1) {
	        focusedQueries = [].concat(_toConsumableArray(state.focusedQueries), [action.query]);
	      } else {
	        focusedQueries = [].concat(_toConsumableArray(state.focusedQueries.slice(0, targetQueryIndex)), _toConsumableArray(state.focusedQueries.slice(targetQueryIndex + 1)));
	      }
	      return _extends({}, state, {
	        focusedQueries: focusedQueries
	      });
	    case _uiActions.TOGGLE_FOCUS_KEYWORD:
	      var targetKeywordIndex = state.focusedKeywords.indexOf(action.keyword);
	      var focusedKeywords = [];
	      if (targetKeywordIndex === -1) {
	        focusedKeywords = [].concat(_toConsumableArray(state.focusedKeywords), [action.keyword]);
	      } else {
	        focusedKeywords = [].concat(_toConsumableArray(state.focusedKeywords.slice(0, targetKeywordIndex)), _toConsumableArray(state.focusedKeywords.slice(targetKeywordIndex + 1)));
	      }
	      return _extends({}, state, {
	        focusedKeywords: focusedKeywords
	      });
	    case _uiActions.CLEAR_FOCUSED_QUERIES:
	      return _extends({}, state, {
	        focusedQueries: _initialState2.default.ui.focusedQueries
	      });
	    case _uiActions.CLEAR_FOCUSED_KEYWORDS:
	      return _extends({}, state, {
	        focusedKeywords: _initialState2.default.ui.focusedKeywords
	      });
	    default:
	      return state;
	  }
	};

	exports.default = ui;

/***/ },

/***/ 581:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _studyActions = __webpack_require__(573);

	var _initialState = __webpack_require__(579);

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

/***/ 582:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvQXBwL0FwcC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQXBwL0FwcC5jc3MiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL1Rhc2tEZXNjcmlwdGlvbi9UYXNrRGVzY3JpcHRpb24uanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1Rhc2tEZXNjcmlwdGlvbi9UYXNrRGVzY3JpcHRpb24uY3NzIiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9RdWVyeUxpc3QvUXVlcnlMaXN0LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9RdWVyeUxpc3QvUXVlcnlMaXN0LmNzcyIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvUXVlcnkvUXVlcnkuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1F1ZXJ5L1F1ZXJ5LmNzcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3VpQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvS2V5d29yZExpc3QvS2V5d29yZExpc3QuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0tleXdvcmRMaXN0L0tleXdvcmRMaXN0LmNzcyIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvS2V5d29yZC9LZXl3b3JkLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9LZXl3b3JkL0tleXdvcmQuY3NzIiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9Db2xsZWN0aW9uVmlldy9Db2xsZWN0aW9uVmlldy5qc3giLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL0V4YW1wbGVMaXN0L0V4YW1wbGVMaXN0LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9FeGFtcGxlTGlzdC9FeGFtcGxlTGlzdC5jc3MiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL0V4YW1wbGUvRXhhbXBsZS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRXhhbXBsZS9FeGFtcGxlLmNzcyIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvS2V5d29yZFZpZXcvS2V5d29yZFZpZXcuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0tleXdvcmRWaWV3L0tleXdvcmRWaWV3LmNzcyIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvS2V5d29yZEV4YW1wbGVMaXN0L0tleXdvcmRFeGFtcGxlTGlzdC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvS2V5d29yZEV4YW1wbGVMaXN0L0tleXdvcmRFeGFtcGxlTGlzdC5jc3MiLCJ3ZWJwYWNrOi8vL3NyYy9sYXlvdXRzL0Jsb2NrL0Jsb2NrLmpzeCIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvUXVlcnlWaWV3L1F1ZXJ5Vmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvUXVlcnlWaWV3L1F1ZXJ5Vmlldy5jc3MiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL1RpdGxlL1RpdGxlLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9UaXRsZS9UaXRsZS5jc3MiLCJ3ZWJwYWNrOi8vL3NyYy9sYXlvdXRzL0ZsZXgvRmxleC5qc3giLCJ3ZWJwYWNrOi8vL3NyYy9zdG9yZS9zb2NrZXQuanMiLCJ3ZWJwYWNrOi8vL3NyYy9zdG9yZS9kYXRhQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3N0dWR5QWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3N0b3JlLmpzIiwid2VicGFjazovLy9zcmMvc3RvcmUvcm9vdFJlZHVjZXIuanMiLCJ3ZWJwYWNrOi8vL3NyYy9zdG9yZS9kYXRhUmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL2luaXRpYWxTdGF0ZS5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3VpUmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3N0dWR5UmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL3Jlc2V0LmNzcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2JhYmVsLXBvbHlmaWxsJ1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJ1xuaW1wb3J0IEFwcCBmcm9tICcuL2NvbXBvbmVudHMvQXBwJ1xuaW1wb3J0IGNvbmZpZ3VyZVN0b3JlIGZyb20gJy4vc3RvcmUnXG5pbXBvcnQge1Byb3ZpZGVyfSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0ICcuL3N0eWxlcy9yZXNldC5jc3MnXG5cbmNvbnN0IHN0b3JlID0gY29uZmlndXJlU3RvcmUoKVxuXG5SZWFjdERPTS5yZW5kZXIoKFxuICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICA8QXBwIC8+XG4gIDwvUHJvdmlkZXI+XG4pLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzaWduRml4YXRpb25BcHAnKSlcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9pbmRleC5qc3hcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4J1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vQXBwLmNzcydcbmltcG9ydCBUYXNrRGVzY3JpcHRpb24gZnJvbSAnLi4vVGFza0Rlc2NyaXB0aW9uJ1xuaW1wb3J0IFF1ZXJ5TGlzdCBmcm9tICcuLi9RdWVyeUxpc3QnXG5pbXBvcnQgS2V5d29yZExpc3QgZnJvbSAnLi4vS2V5d29yZExpc3QnXG5pbXBvcnQgQ29sbGVjdGlvblZpZXcgZnJvbSAnLi4vQ29sbGVjdGlvblZpZXcnXG5pbXBvcnQgS2V5d29yZFZpZXcgZnJvbSAnLi4vS2V5d29yZFZpZXcnXG5pbXBvcnQgUXVlcnlWaWV3IGZyb20gJy4uL1F1ZXJ5VmlldydcbmltcG9ydCBUaXRsZSBmcm9tICcuLi9UaXRsZSdcbmltcG9ydCBGbGV4IGZyb20gJy4uLy4uL2xheW91dHMvRmxleCdcblxuaW1wb3J0IHNvY2tldCBmcm9tICcuLi8uLi9zdG9yZS9zb2NrZXQnXG5pbXBvcnQge3JlY2VpdmVEYXRhLCByZWNlaXZlRXhhbXBsZSwgcmVjZWl2ZVF1ZXJ5fSBmcm9tICcuLi8uLi9zdG9yZS9kYXRhQWN0aW9ucydcbmltcG9ydCB7Y2xlYXJGb2N1c2VkUXVlcmllcywgY2xlYXJGb2N1c2VkS2V5d29yZHN9IGZyb20gJy4uLy4uL3N0b3JlL3VpQWN0aW9ucydcbmltcG9ydCB7cmVjZWl2ZVN0dWR5LCBraWxsU3R1ZHl9IGZyb20gJy4uLy4uL3N0b3JlL3N0dWR5QWN0aW9ucydcblxuY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50V2lsbE1vdW50ICgpIHtcbiAgICBjb25zdCB7ZGlzcGF0Y2h9ID0gdGhpcy5wcm9wc1xuXG4gICAgc29ja2V0LmVtaXQoJ2dldCBzdHVkeScpXG5cbiAgICBzb2NrZXQub24oJ3N0dWR5JywgKGRhdGEpID0+IHtcbiAgICAgIGRpc3BhdGNoKHJlY2VpdmVTdHVkeShkYXRhLnBhcnRpY2lwYW50SWQsIGRhdGEuc2Vzc2lvbklkLCBkYXRhLmNvbmRpdGlvbiwgZGF0YS50YXNrQWxpYXMpKVxuICAgICAgc29ja2V0LmVtaXQoJ2dldCBkYXRhJywge3Nlc3Npb25JZDogZGF0YS50cmFpbmluZyA/ICd0ZXN0JyA6IGRhdGEuc2Vzc2lvbklkLCB0YXNrQWxpYXM6IGRhdGEudGFza0FsaWFzfSlcbiAgICB9KVxuXG4gICAgc29ja2V0Lm9uKCdjb25maXJtIGtpbGwgc3R1ZHknLCAoKSA9PiB7XG4gICAgICBkaXNwYXRjaChraWxsU3R1ZHkoKSlcbiAgICB9KVxuXG4gICAgc29ja2V0Lm9uKCdjb25maXJtIGNyZWF0ZSBleGFtcGxlJywgZSA9PiB7XG4gICAgICBkaXNwYXRjaChyZWNlaXZlRXhhbXBsZShlKSlcbiAgICB9KVxuXG4gICAgc29ja2V0Lm9uKCdjb25maXJtIGNyZWF0ZSBxdWVyeScsIHEgPT4ge1xuICAgICAgZGlzcGF0Y2gocmVjZWl2ZVF1ZXJ5KHEpKVxuICAgIH0pXG5cbiAgICBzb2NrZXQub24oJ2RhdGEnLCAoZGF0YSkgPT4ge1xuICAgICAgZGlzcGF0Y2gocmVjZWl2ZURhdGEoZGF0YS5xdWVyaWVzLCBkYXRhLmV4YW1wbGVzLCBkYXRhLnRhc2spKVxuICAgIH0pXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHtmb2N1c2VkUXVlcmllcywgZm9jdXNlZEtleXdvcmRzLCBjb25kaXRpb24sIGRpc3BhdGNofSA9IHRoaXMucHJvcHNcblxuICAgIGxldCBib2R5RWwgPSAnJ1xuICAgIGlmIChmb2N1c2VkUXVlcmllcy5sZW5ndGggPiAwKSB7XG4gICAgICBib2R5RWwgPSAoXG4gICAgICAgIDxRdWVyeVZpZXcgLz5cbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKGZvY3VzZWRLZXl3b3Jkcy5sZW5ndGggPiAwKSB7XG4gICAgICBib2R5RWwgPSAoXG4gICAgICAgIDxLZXl3b3JkVmlldyAvPlxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICBib2R5RWwgPSAoXG4gICAgICAgIDxDb2xsZWN0aW9uVmlldyAvPlxuICAgICAgKVxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLkFwcH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuQXBwU2lkZWJhcn0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5BcHBTaWRlYmFyX190aXRsZX0+XG4gICAgICAgICAgICA8VGl0bGUgdGl0bGU9XCJEZXNpZ24gVGFza1wiIC8+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLkFwcFNpZGViYXJfX2hlYWRlcn0+XG4gICAgICAgICAgICA8VGFza0Rlc2NyaXB0aW9uIC8+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7Y29uZGl0aW9uID09PSAnc3lzdGVtJ1xuICAgICAgICAgICAgPyA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLkFwcFNpZGViYXJfX3RpdGxlfT5cbiAgICAgICAgICAgICAgPEZsZXhcbiAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zPVwiY2VudGVyXCJcbiAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudD1cInNwYWNlLWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICA8VGl0bGUgdGl0bGU9XCJTZWFyY2hlc1wiIC8+XG4gICAgICAgICAgICAgICAge2ZvY3VzZWRRdWVyaWVzLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICAgID8gPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBkaXNwYXRjaChjbGVhckZvY3VzZWRRdWVyaWVzKCkpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5BcHBTaWRlYmFyX19jbGVhckZpbHRlcnN9PmNsZWFyIGFsbDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgOiAnJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgPC9GbGV4PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA6ICcnXG4gICAgICAgICAgfVxuXG4gICAgICAgICAge2NvbmRpdGlvbiA9PT0gJ3N5c3RlbSdcbiAgICAgICAgICAgID8gPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5BcHBTaWRlYmFyX19ib2R5fT5cbiAgICAgICAgICAgICAgPFF1ZXJ5TGlzdCAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA6ICcnXG4gICAgICAgICAgfVxuXG4gICAgICAgICAge2NvbmRpdGlvbiA9PT0gJ3N5c3RlbSdcbiAgICAgICAgICAgID8gPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5BcHBTaWRlYmFyX190aXRsZX0+XG4gICAgICAgICAgICAgIDxGbGV4XG4gICAgICAgICAgICAgICAgYWxpZ25JdGVtcz1cImNlbnRlclwiXG4gICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ9XCJzcGFjZS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgPFRpdGxlIHRpdGxlPVwiQ29tbW9uIEtleXdvcmRzXCIgLz5cbiAgICAgICAgICAgICAgICB7Zm9jdXNlZEtleXdvcmRzLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICAgID8gPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBkaXNwYXRjaChjbGVhckZvY3VzZWRLZXl3b3JkcygpKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuQXBwU2lkZWJhcl9fY2xlYXJGaWx0ZXJzfT5jbGVhciBhbGw8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDogJydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDwvRmxleD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgOiAnJ1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHtjb25kaXRpb24gPT09ICdzeXN0ZW0nXG4gICAgICAgICAgICA/IDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuQXBwU2lkZWJhcl9fYm9keX0+XG4gICAgICAgICAgICAgIDxLZXl3b3JkTGlzdCAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA6ICcnXG4gICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLkFwcF9fbWFpbn0+XG4gICAgICAgICAge2JvZHlFbH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcbiAgc3RhdGUgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBzZXNzaW9uSWQ6IHN0YXRlLnN0dWR5LnNlc3Npb25JZCxcbiAgICAgIHRhc2tBbGlhczogc3RhdGUuc3R1ZHkudGFza0FsaWFzLFxuICAgICAgY29uZGl0aW9uOiBzdGF0ZS5zdHVkeS5jb25kaXRpb24sXG4gICAgICBmb2N1c2VkUXVlcmllczogc3RhdGUudWkuZm9jdXNlZFF1ZXJpZXMsXG4gICAgICBmb2N1c2VkS2V5d29yZHM6IHN0YXRlLnVpLmZvY3VzZWRLZXl3b3Jkc1xuICAgIH1cbiAgfVxuKShBcHApXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvY29tcG9uZW50cy9BcHAvQXBwLmpzeFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcIkFwcFwiOlwiQXBwX19BcHBfX19sQkVYSVwiLFwiQXBwX19tYWluXCI6XCJBcHBfX0FwcF9fbWFpbl9fXzJWWmppXCIsXCJBcHBTaWRlYmFyXCI6XCJBcHBfX0FwcFNpZGViYXJfX193WHZGNFwiLFwiQXBwU2lkZWJhcl9faGVhZGVyXCI6XCJBcHBfX0FwcFNpZGViYXJfX2hlYWRlcl9fXzJXdHFDXCIsXCJBcHBTaWRlYmFyX19ib2R5XCI6XCJBcHBfX0FwcFNpZGViYXJfX2JvZHlfX19aZHlWX1wiLFwiQXBwU2lkZWJhcl9fdGl0bGVcIjpcIkFwcF9fQXBwU2lkZWJhcl9fdGl0bGVfX18xMmhTQlwiLFwiQXBwU2lkZWJhcl9fY2xlYXJGaWx0ZXJzXCI6XCJBcHBfX0FwcFNpZGViYXJfX2NsZWFyRmlsdGVyc19fX1pETklYXCJ9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9BcHAvQXBwLmNzc1xuICoqIG1vZHVsZSBpZCA9IDQ5NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL1Rhc2tEZXNjcmlwdGlvbi5jc3MnXG5cbmNvbnN0IFRhc2tEZXNjcmlwdGlvbiA9ICh7XG4gIHRhc2ssXG4gIGZvY3VzZWRRdWVyaWVzXG59KSA9PiB7XG4gIGNvbnN0IHF1ZXJ5VGFza3MgPSBmb2N1c2VkUXVlcmllcy5tYXAoKHEsIGkpID0+IHtcbiAgICBsZXQgbWF0Y2hlZFRhc2sgPSBxLm1hdGNoZWRUYXNrXG5cbiAgICBpZiAobWF0Y2hlZFRhc2spIHtcbiAgICAgIHdoaWxlIChtYXRjaGVkVGFzay5pbmRleE9mKCc8ZW0+JykgIT09IC0xKSB7XG4gICAgICAgIGNvbnN0IGluc2VydFBvc2l0aW9uID0gbWF0Y2hlZFRhc2suaW5kZXhPZignPGVtPicpICsgM1xuICAgICAgICBjb25zdCBxdWVyeUNvbG9yID0gYHJnYmEoJHtxLmNvbG9yLnNsaWNlKDQsIHEuY29sb3IubGVuZ3RoIC0gMSl9LCAwLjMpYFxuICAgICAgICBtYXRjaGVkVGFzayA9IGAke21hdGNoZWRUYXNrLnNsaWNlKDAsIGluc2VydFBvc2l0aW9uKX0gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAke3F1ZXJ5Q29sb3J9O1wiICR7bWF0Y2hlZFRhc2suc2xpY2UoaW5zZXJ0UG9zaXRpb24pfWBcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5UYXNrRGVzY3JpcHRpb25fX3F1ZXJ5fVxuICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7X19odG1sOiBtYXRjaGVkVGFza319IC8+XG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJ1xuICAgIH1cbiAgfSlcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuVGFza0Rlc2NyaXB0aW9ufT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuVGFza0Rlc2NyaXB0aW9uX19tYWlufT5cbiAgICAgICAge3Rhc2sudGV4dH1cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7cXVlcnlUYXNrc31cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxuICBzdGF0ZSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRhc2s6IHN0YXRlLmRhdGEudGFzayB8fCB7fSxcbiAgICAgIGZvY3VzZWRRdWVyaWVzOiBzdGF0ZS5kYXRhLnF1ZXJpZXMuZmlsdGVyKHEgPT4gc3RhdGUudWkuZm9jdXNlZFF1ZXJpZXMuaW5kZXhPZihxLnF1ZXJ5KSAhPT0gLTEpXG4gICAgfVxuICB9XG4pKFRhc2tEZXNjcmlwdGlvbilcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jb21wb25lbnRzL1Rhc2tEZXNjcmlwdGlvbi9UYXNrRGVzY3JpcHRpb24uanN4XG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiVGFza0Rlc2NyaXB0aW9uXCI6XCJUYXNrRGVzY3JpcHRpb25fX1Rhc2tEZXNjcmlwdGlvbl9fXzF0T0s5XCIsXCJUYXNrRGVzY3JpcHRpb25fX21haW5cIjpcIlRhc2tEZXNjcmlwdGlvbl9fVGFza0Rlc2NyaXB0aW9uX19tYWluX19fTTNOSU5cIixcIlRhc2tEZXNjcmlwdGlvbl9fcXVlcnlcIjpcIlRhc2tEZXNjcmlwdGlvbl9fVGFza0Rlc2NyaXB0aW9uX19xdWVyeV9fXzFoMnFPXCJ9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9UYXNrRGVzY3JpcHRpb24vVGFza0Rlc2NyaXB0aW9uLmNzc1xuICoqIG1vZHVsZSBpZCA9IDQ5N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL1F1ZXJ5TGlzdC5jc3MnXG5pbXBvcnQgUXVlcnkgZnJvbSAnLi4vUXVlcnknXG5cbmNsYXNzIFF1ZXJ5TGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3Qge3F1ZXJpZXN9ID0gdGhpcy5wcm9wc1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuUXVlcnlMaXN0fT5cbiAgICAgICAge3F1ZXJpZXMubWFwKChxLCBpbmRleCkgPT5cbiAgICAgICAgICA8UXVlcnlcbiAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICBxdWVyeT17cX0gLz5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxuICBzdGF0ZSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHF1ZXJpZXM6IFsuLi5zdGF0ZS5kYXRhLnF1ZXJpZXNdLnNvcnQoKGEsIGIpID0+IGIuZXhhbXBsZXNDb3VudCAtIGEuZXhhbXBsZXNDb3VudClcbiAgICB9XG4gIH1cbikoUXVlcnlMaXN0KVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2NvbXBvbmVudHMvUXVlcnlMaXN0L1F1ZXJ5TGlzdC5qc3hcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJRdWVyeUxpc3RcIjpcIlF1ZXJ5TGlzdF9fUXVlcnlMaXN0X19fMkhjZ0xcIn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL1F1ZXJ5TGlzdC9RdWVyeUxpc3QuY3NzXG4gKiogbW9kdWxlIGlkID0gNDk5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4J1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vUXVlcnkuY3NzJ1xuXG5pbXBvcnQge3RvZ2dsZUZvY3VzUXVlcnl9IGZyb20gJy4uLy4uL3N0b3JlL3VpQWN0aW9ucydcblxuY29uc3QgUXVlcnkgPSAoe1xuICBxdWVyeSxcbiAgZm9jdXNlZFF1ZXJpZXMsXG4gIHRvZ2dsZUZvY3VzXG59KSA9PiB7XG4gIGxldCBzdHlsZSA9IHt9XG4gIGxldCBjbGFzc05hbWVzID0gW3N0eWxlcy5RdWVyeV1cbiAgaWYgKGZvY3VzZWRRdWVyaWVzLmluZGV4T2YocXVlcnkucXVlcnkpICE9PSAtMSkge1xuICAgIHN0eWxlLmJhY2tncm91bmRDb2xvciA9IGByZ2JhKCR7cXVlcnkuY29sb3Iuc2xpY2UoNCwgcXVlcnkuY29sb3IubGVuZ3RoIC0gMSl9LCAwLjMpYFxuICAgIGNsYXNzTmFtZXMucHVzaChzdHlsZXMuUXVlcnlfaXNGb2N1c2VkKVxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBvbkNsaWNrPXt0b2dnbGVGb2N1c31cbiAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5qb2luKCcgJyl9PlxuICAgICAge3F1ZXJ5LnF1ZXJ5fSAoe3F1ZXJ5LmV4YW1wbGVzQ291bnR9KVxuICAgIDwvZGl2PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXG4gIHN0YXRlID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgZm9jdXNlZFF1ZXJpZXM6IHN0YXRlLnVpLmZvY3VzZWRRdWVyaWVzXG4gICAgfVxuICB9LFxuICAoZGlzcGF0Y2gsIG93blByb3BzKSA9PiB7XG4gICAgY29uc3Qge3F1ZXJ5OiB7cXVlcnl9fSA9IG93blByb3BzXG5cbiAgICByZXR1cm4ge1xuICAgICAgdG9nZ2xlRm9jdXM6ICgpID0+IHtcbiAgICAgICAgZGlzcGF0Y2godG9nZ2xlRm9jdXNRdWVyeShxdWVyeSkpXG4gICAgICB9XG4gICAgfVxuICB9XG4pKFF1ZXJ5KVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2NvbXBvbmVudHMvUXVlcnkvUXVlcnkuanN4XG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiUXVlcnlcIjpcIlF1ZXJ5X19RdWVyeV9fXzMyeVZQXCIsXCJRdWVyeV9pc0ZvY3VzZWRcIjpcIlF1ZXJ5X19RdWVyeV9pc0ZvY3VzZWRfX18zWXU2WlwifTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvUXVlcnkvUXVlcnkuY3NzXG4gKiogbW9kdWxlIGlkID0gNTAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnQgY29uc3QgVE9HR0xFX0hJR0hMSUdIVF9RVUVSWSA9ICdUT0dHTEVfSElHSExJR0hUX1FVRVJZJ1xuZXhwb3J0IGNvbnN0IFRPR0dMRV9GT0NVU19RVUVSWSA9ICdUT0dHTEVfRk9DVVNfUVVFUlknXG5leHBvcnQgY29uc3QgVE9HR0xFX0ZPQ1VTX0tFWVdPUkQgPSAnVE9HR0xFX0ZPQ1VTX0tFWVdPUkQnXG5leHBvcnQgY29uc3QgQ0xFQVJfRk9DVVNFRF9RVUVSSUVTID0gJ0NMRUFSX0ZPQ1VTRURfUVVFUklFUydcbmV4cG9ydCBjb25zdCBDTEVBUl9GT0NVU0VEX0tFWVdPUkRTID0gJ0NMRUFSX0ZPQ1VTRURfS0VZV09SRFMnXG5cbmV4cG9ydCBjb25zdCB0b2dnbGVIaWdobGlnaHRRdWVyeSA9IChxdWVyeSkgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IFRPR0dMRV9ISUdITElHSFRfUVVFUlksXG4gICAgcXVlcnlcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgdG9nZ2xlRm9jdXNRdWVyeSA9IChxdWVyeSkgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IFRPR0dMRV9GT0NVU19RVUVSWSxcbiAgICBxdWVyeVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCB0b2dnbGVGb2N1c0tleXdvcmQgPSAoa2V5d29yZCkgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IFRPR0dMRV9GT0NVU19LRVlXT1JELFxuICAgIGtleXdvcmRcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgY2xlYXJGb2N1c2VkUXVlcmllcyA9ICgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBDTEVBUl9GT0NVU0VEX1FVRVJJRVNcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgY2xlYXJGb2N1c2VkS2V5d29yZHMgPSAoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQ0xFQVJfRk9DVVNFRF9LRVlXT1JEU1xuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvc3RvcmUvdWlBY3Rpb25zLmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL0tleXdvcmRMaXN0LmNzcydcbmltcG9ydCBLZXl3b3JkIGZyb20gJy4uL0tleXdvcmQnXG5cbmNsYXNzIEtleXdvcmRMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7a2V5d29yZHN9ID0gdGhpcy5wcm9wc1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuS2V5d29yZExpc3R9PlxuICAgICAgICB7a2V5d29yZHMubWFwKChrLCBpbmRleCkgPT5cbiAgICAgICAgICA8S2V5d29yZFxuICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgIGtleXdvcmQ9e2t9IC8+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcbiAgc3RhdGUgPT4ge1xuICAgIGNvbnN0IHF1ZXJpZXMgPSBzdGF0ZS51aS5mb2N1c2VkUXVlcmllcy5sZW5ndGhcbiAgICAgID8gc3RhdGUudWkuZm9jdXNlZFF1ZXJpZXNcbiAgICAgIDogc3RhdGUuZGF0YS5xdWVyaWVzLm1hcChxID0+IHEucXVlcnkpXG4gICAgY29uc3QgZXhhbXBsZXMgPSBzdGF0ZS5kYXRhLmV4YW1wbGVzLmZpbHRlcihlID0+IHF1ZXJpZXMuaW5kZXhPZihlLnF1ZXJ5KSAhPT0gLTEpXG4gICAgY29uc3Qgc3RlbXMgPSBleGFtcGxlcy5yZWR1Y2UoKGNhcnJ5LCBjdXJyZW50KSA9PiBbLi4uY2FycnksIC4uLmN1cnJlbnQuaW1hZ2VEZXNjcmlwdGlvblN0ZW1zXSwgW10pXG5cbiAgICBjb25zdCBrZXl3b3JkcyA9IFtdXG4gICAgY29uc3Qgc3RlbUluZGV4TWFwID0ge31cblxuICAgIGZvciAobGV0IHN0ZW0gb2Ygc3RlbXMpIHtcbiAgICAgIGNvbnN0IHN0ZW1JbmRleCA9IHN0ZW1JbmRleE1hcFtzdGVtXVxuICAgICAgaWYgKHN0ZW1JbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGtleXdvcmRzW3N0ZW1JbmRleF0uZnJlcXVlbmN5ICs9IDFcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0ZW1JbmRleE1hcFtzdGVtXSA9IGtleXdvcmRzLmxlbmd0aFxuICAgICAgICBrZXl3b3Jkcy5wdXNoKHtcbiAgICAgICAgICBmcmVxdWVuY3k6IDEsXG4gICAgICAgICAgc3RlbVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBrZXl3b3Jkczoga2V5d29yZHMuc29ydCgoYSwgYikgPT4gYi5mcmVxdWVuY3kgLSBhLmZyZXF1ZW5jeSlcbiAgICB9XG4gIH1cbikoS2V5d29yZExpc3QpXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvY29tcG9uZW50cy9LZXl3b3JkTGlzdC9LZXl3b3JkTGlzdC5qc3hcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJLZXl3b3JkTGlzdFwiOlwiS2V5d29yZExpc3RfX0tleXdvcmRMaXN0X19fRTZnbzdcIn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL0tleXdvcmRMaXN0L0tleXdvcmRMaXN0LmNzc1xuICoqIG1vZHVsZSBpZCA9IDUwNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL0tleXdvcmQuY3NzJ1xuXG5pbXBvcnQge3RvZ2dsZUZvY3VzS2V5d29yZH0gZnJvbSAnLi4vLi4vc3RvcmUvdWlBY3Rpb25zJ1xuXG5jb25zdCBLZXl3b3JkID0gKHtcbiAga2V5d29yZCxcbiAgZm9jdXNlZEtleXdvcmRzLFxuICB0b2dnbGVGb2N1cyxcbiAgc3RlbURpY3Rpb25hcnlcbn0pID0+IHtcbiAgbGV0IGNsYXNzTmFtZXMgPSBbc3R5bGVzLktleXdvcmRdXG4gIGlmIChmb2N1c2VkS2V5d29yZHMuaW5kZXhPZihrZXl3b3JkLnN0ZW0pICE9PSAtMSkge1xuICAgIGNsYXNzTmFtZXMucHVzaChzdHlsZXMuS2V5d29yZF9pc0ZvY3VzZWQpXG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIG9uQ2xpY2s9e3RvZ2dsZUZvY3VzfVxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzLmpvaW4oJyAnKX0+XG4gICAgICB7c3RlbURpY3Rpb25hcnlba2V5d29yZC5zdGVtXX0gKHtrZXl3b3JkLmZyZXF1ZW5jeX0pXG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcbiAgc3RhdGUgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBmb2N1c2VkS2V5d29yZHM6IHN0YXRlLnVpLmZvY3VzZWRLZXl3b3JkcyxcbiAgICAgIHN0ZW1EaWN0aW9uYXJ5OiBzdGF0ZS5kYXRhLnN0ZW1EaWN0aW9uYXJ5XG4gICAgfVxuICB9LFxuICAoZGlzcGF0Y2gsIG93blByb3BzKSA9PiB7XG4gICAgY29uc3Qge2tleXdvcmQ6IHtzdGVtfX0gPSBvd25Qcm9wc1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRvZ2dsZUZvY3VzOiAoKSA9PiB7XG4gICAgICAgIGRpc3BhdGNoKHRvZ2dsZUZvY3VzS2V5d29yZChzdGVtKSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbikoS2V5d29yZClcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jb21wb25lbnRzL0tleXdvcmQvS2V5d29yZC5qc3hcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJLZXl3b3JkXCI6XCJLZXl3b3JkX19LZXl3b3JkX19fMkVrU1lcIixcIktleXdvcmRfaXNGb2N1c2VkXCI6XCJLZXl3b3JkX19LZXl3b3JkX2lzRm9jdXNlZF9fX3cwTVJTXCJ9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9LZXl3b3JkL0tleXdvcmQuY3NzXG4gKiogbW9kdWxlIGlkID0gNTA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4J1xuXG5pbXBvcnQgRXhhbXBsZUxpc3QgZnJvbSAnLi4vRXhhbXBsZUxpc3QnXG5cbmNvbnN0IENvbGxlY3Rpb25WaWV3ID0gKHtcbiAgZXhhbXBsZXNcbn0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8RXhhbXBsZUxpc3RcbiAgICAgIG5Db2xzPXs1fVxuICAgICAgZXhhbXBsZXM9e2V4YW1wbGVzfSAvPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXG4gIHN0YXRlID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgZXhhbXBsZXM6IFsuLi5zdGF0ZS5kYXRhLmV4YW1wbGVzXS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgIGlmIChiLmNyZWF0ZWRBdCA+IGEuY3JlYXRlZEF0KSB7XG4gICAgICAgICAgcmV0dXJuIC0xXG4gICAgICAgIH0gZWxzZSBpZiAoYS5jcmVhdGVkQXQgPj0gYi5jcmVhdGVkQXQpIHtcbiAgICAgICAgICByZXR1cm4gMVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuKShDb2xsZWN0aW9uVmlldylcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jb21wb25lbnRzL0NvbGxlY3Rpb25WaWV3L0NvbGxlY3Rpb25WaWV3LmpzeFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL0V4YW1wbGVMaXN0LmNzcydcbmltcG9ydCBFeGFtcGxlIGZyb20gJy4uL0V4YW1wbGUnXG5cbmNsYXNzIEV4YW1wbGVMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7ZXhhbXBsZXMsIG5Db2xzfSA9IHRoaXMucHJvcHNcbiAgICBjb25zdCBjb2x1bW5zID0gW11cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbkNvbHM7IGkrKykge1xuICAgICAgY29uc3QgY29sdW1uID0gZXhhbXBsZXMuZmlsdGVyKChlLCBpbmRleCkgPT4ge1xuICAgICAgICByZXR1cm4gaW5kZXggJSBuQ29scyA9PT0gaVxuICAgICAgfSlcblxuICAgICAgY29sdW1ucy5wdXNoKGNvbHVtbilcbiAgICB9XG5cbiAgICBsZXQgY2xhc3NOYW1lcyA9IFtzdHlsZXMuRXhhbXBsZUxpc3RdXG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMuam9pbignICcpfT5cbiAgICAgICAge2NvbHVtbnMubWFwKChjb2x1bW4sIGkpID0+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuRXhhbXBsZUxpc3RfX2NvbHVtbn0+XG4gICAgICAgICAgICB7Y29sdW1uLm1hcCgoZXhhbXBsZSwgaikgPT5cbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGtleT17an1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5FeGFtcGxlTGlzdF9fZXhhbXBsZX0+XG4gICAgICAgICAgICAgICAgPEV4YW1wbGVcbiAgICAgICAgICAgICAgICAgIGNvbXBhY3Q9e25Db2xzID4gNX1cbiAgICAgICAgICAgICAgICAgIGV4YW1wbGU9e2V4YW1wbGV9IC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX08L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFeGFtcGxlTGlzdFxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2NvbXBvbmVudHMvRXhhbXBsZUxpc3QvRXhhbXBsZUxpc3QuanN4XG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiRXhhbXBsZUxpc3RcIjpcIkV4YW1wbGVMaXN0X19FeGFtcGxlTGlzdF9fXzc0SmMzXCIsXCJFeGFtcGxlTGlzdF9fY29sdW1uXCI6XCJFeGFtcGxlTGlzdF9fRXhhbXBsZUxpc3RfX2NvbHVtbl9fXzNGemtXXCIsXCJFeGFtcGxlTGlzdF9fZXhhbXBsZVwiOlwiRXhhbXBsZUxpc3RfX0V4YW1wbGVMaXN0X19leGFtcGxlX19fM2VqTF9cIn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL0V4YW1wbGVMaXN0L0V4YW1wbGVMaXN0LmNzc1xuICoqIG1vZHVsZSBpZCA9IDUwOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL0V4YW1wbGUuY3NzJ1xuaW1wb3J0IHt0b2dnbGVIaWdobGlnaHRRdWVyeX0gZnJvbSAnLi4vLi4vc3RvcmUvdWlBY3Rpb25zJ1xuXG5jb25zdCBFeGFtcGxlID0gKHtcbiAgZXhhbXBsZSxcbiAgY29tcGFjdCxcbiAgY29sb3IsXG4gIGZvY3VzZWRRdWVyaWVzLFxuICBoaWdobGlnaHRlZFF1ZXJ5LFxuICBoaWdobGlnaHRRdWVyeVxufSkgPT4ge1xuICBsZXQgc3R5bGUgPSB7fVxuICBsZXQgY2xhc3NOYW1lcyA9IFtzdHlsZXMuRXhhbXBsZV1cbiAgaWYgKGNvbXBhY3QpIHtcbiAgICBjbGFzc05hbWVzLnB1c2goc3R5bGVzLkV4YW1wbGVfY29tcGFjdClcbiAgfVxuICBpZiAoZm9jdXNlZFF1ZXJpZXMubGVuZ3RoID4gMSAmJiBoaWdobGlnaHRlZFF1ZXJ5ID09PSBleGFtcGxlLnF1ZXJ5KSB7XG4gICAgc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYHJnYmEoJHtjb2xvci5zbGljZSg0LCBjb2xvci5sZW5ndGggLSAxKX0sIDAuMylgXG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIG9uTW91c2VFbnRlcj17aGlnaGxpZ2h0UXVlcnl9XG4gICAgICBvbk1vdXNlTGVhdmU9e2hpZ2hsaWdodFF1ZXJ5fVxuICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzLmpvaW4oJyAnKX0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLkV4YW1wbGVfX2ltYWdlV3JhcHBlcn0+XG4gICAgICAgIDxpbWdcbiAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5FeGFtcGxlX19pbWFnZX1cbiAgICAgICAgICBzcmM9e2V4YW1wbGUuZXhhbXBsZS5zcmN9IC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5FeGFtcGxlX19kZXNjcmlwdGlvbn0+XG4gICAgICAgIHtleGFtcGxlLmltYWdlRGVzY3JpcHRpb259XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxuICAoc3RhdGUsIG93blByb3BzKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGZvY3VzZWRRdWVyaWVzOiBzdGF0ZS51aS5mb2N1c2VkUXVlcmllcyxcbiAgICAgIGhpZ2hsaWdodGVkUXVlcnk6IHN0YXRlLnVpLmhpZ2hsaWdodGVkUXVlcnksXG4gICAgICBjb2xvcjogc3RhdGUuZGF0YS5xdWVyaWVzLmZpbHRlcihxID0+IHEucXVlcnkgPT09IG93blByb3BzLmV4YW1wbGUucXVlcnkpWzBdLmNvbG9yXG4gICAgfVxuICB9LFxuICAoZGlzcGF0Y2gsIG93blByb3BzKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGhpZ2hsaWdodFF1ZXJ5OiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHtxdWVyeX0gPSBvd25Qcm9wcy5leGFtcGxlXG5cbiAgICAgICAgZGlzcGF0Y2godG9nZ2xlSGlnaGxpZ2h0UXVlcnkocXVlcnkpKVxuICAgICAgfVxuICAgIH1cbiAgfVxuKShFeGFtcGxlKVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2NvbXBvbmVudHMvRXhhbXBsZS9FeGFtcGxlLmpzeFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcIkV4YW1wbGVcIjpcIkV4YW1wbGVfX0V4YW1wbGVfX18yN1MwaVwiLFwiRXhhbXBsZV9faW1hZ2VXcmFwcGVyXCI6XCJFeGFtcGxlX19FeGFtcGxlX19pbWFnZVdyYXBwZXJfX18xTC16NVwiLFwiRXhhbXBsZV9faW1hZ2VcIjpcIkV4YW1wbGVfX0V4YW1wbGVfX2ltYWdlX19fM1lkNjFcIixcIkV4YW1wbGVfX2Rlc2NyaXB0aW9uXCI6XCJFeGFtcGxlX19FeGFtcGxlX19kZXNjcmlwdGlvbl9fXzFSV2hyXCIsXCJFeGFtcGxlX2NvbXBhY3RcIjpcIkV4YW1wbGVfX0V4YW1wbGVfY29tcGFjdF9fXzJrWWZKXCJ9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9FeGFtcGxlL0V4YW1wbGUuY3NzXG4gKiogbW9kdWxlIGlkID0gNTExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4J1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vS2V5d29yZFZpZXcuY3NzJ1xuaW1wb3J0IEV4YW1wbGVMaXN0IGZyb20gJy4uL0V4YW1wbGVMaXN0J1xuaW1wb3J0IEtleXdvcmRFeGFtcGxlTGlzdCBmcm9tICcuLi9LZXl3b3JkRXhhbXBsZUxpc3QnXG5cbmNvbnN0IEtleXdvcmRWaWV3ID0gKHtcbiAgZm9jdXNlZEtleXdvcmRzLFxuICBleGFtcGxlc1xufSkgPT4ge1xuICBjb25zdCBub25LZXl3b3JkRXhhbXBsZXMgPSBleGFtcGxlcy5maWx0ZXIoZSA9PiB7XG4gICAgZm9yIChsZXQgZmsgb2YgZm9jdXNlZEtleXdvcmRzKSB7XG4gICAgICBpZiAoZS5pbWFnZURlc2NyaXB0aW9uU3RlbXMuaW5kZXhPZihmaykgIT09IC0xKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlXG4gIH0pXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLktleXdvcmRWaWV3fT5cbiAgICAgIHtmb2N1c2VkS2V5d29yZHMubWFwKChrLCBpbmRleCkgPT5cbiAgICAgICAgPEtleXdvcmRFeGFtcGxlTGlzdFxuICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAga2V5d29yZD17a31cbiAgICAgICAgICBleGFtcGxlcz17ZXhhbXBsZXN9IC8+XG4gICAgICApfVxuXG4gICAgICA8RXhhbXBsZUxpc3RcbiAgICAgICAgbkNvbHM9ezh9XG4gICAgICAgIGV4YW1wbGVzPXtub25LZXl3b3JkRXhhbXBsZXN9IC8+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcbiAgc3RhdGUgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBleGFtcGxlczogc3RhdGUuZGF0YS5leGFtcGxlcyxcbiAgICAgIGZvY3VzZWRLZXl3b3Jkczogc3RhdGUudWkuZm9jdXNlZEtleXdvcmRzXG4gICAgfVxuICB9XG4pKEtleXdvcmRWaWV3KVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2NvbXBvbmVudHMvS2V5d29yZFZpZXcvS2V5d29yZFZpZXcuanN4XG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiS2V5d29yZFZpZXdcIjpcIktleXdvcmRWaWV3X19LZXl3b3JkVmlld19fXzIzT0lFXCJ9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9LZXl3b3JkVmlldy9LZXl3b3JkVmlldy5jc3NcbiAqKiBtb2R1bGUgaWQgPSA1MTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnXG5cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9LZXl3b3JkRXhhbXBsZUxpc3QuY3NzJ1xuaW1wb3J0IEV4YW1wbGVMaXN0IGZyb20gJy4uL0V4YW1wbGVMaXN0J1xuaW1wb3J0IEJsb2NrIGZyb20gJy4uLy4uL2xheW91dHMvQmxvY2snXG5cbmNvbnN0IEtleXdvcmRFeGFtcGxlTGlzdCA9ICh7XG4gIGtleXdvcmQsXG4gIGV4YW1wbGVzLFxuICBzdGVtRGljdGlvbmFyeVxufSkgPT4ge1xuICBjb25zdCBmaWx0ZXJlZEV4YW1wbGVzID0gZXhhbXBsZXMuZmlsdGVyKGUgPT4gZS5pbWFnZURlc2NyaXB0aW9uU3RlbXMuaW5kZXhPZihrZXl3b3JkKSAhPT0gLTEpXG5cbiAgaWYgKGZpbHRlcmVkRXhhbXBsZXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxCbG9jaz5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGtleT17a2V5d29yZH1cbiAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5LZXl3b3JkRXhhbXBsZUxpc3R9PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuS2V5d29yZEV4YW1wbGVMaXN0X19rZXl3b3JkfT57c3RlbURpY3Rpb25hcnlba2V5d29yZF19PC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLktleXdvcmRFeGFtcGxlTGlzdF9fZXhhbXBsZXN9PlxuICAgICAgICAgICAgPEV4YW1wbGVMaXN0XG4gICAgICAgICAgICAgIG5Db2xzPXs3fVxuICAgICAgICAgICAgICBleGFtcGxlcz17ZmlsdGVyZWRFeGFtcGxlc30gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L0Jsb2NrPlxuICAgIClcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gKFxuICAgICAgPHNwYW4+PC9zcGFuPlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxuICBzdGF0ZSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0ZW1EaWN0aW9uYXJ5OiBzdGF0ZS5kYXRhLnN0ZW1EaWN0aW9uYXJ5XG4gICAgfVxuICB9XG4pKEtleXdvcmRFeGFtcGxlTGlzdClcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jb21wb25lbnRzL0tleXdvcmRFeGFtcGxlTGlzdC9LZXl3b3JkRXhhbXBsZUxpc3QuanN4XG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiS2V5d29yZEV4YW1wbGVMaXN0XCI6XCJLZXl3b3JkRXhhbXBsZUxpc3RfX0tleXdvcmRFeGFtcGxlTGlzdF9fXzFFXzExXCIsXCJLZXl3b3JkRXhhbXBsZUxpc3RfX2tleXdvcmRcIjpcIktleXdvcmRFeGFtcGxlTGlzdF9fS2V5d29yZEV4YW1wbGVMaXN0X19rZXl3b3JkX19fM212N05cIixcIktleXdvcmRFeGFtcGxlTGlzdF9fZXhhbXBsZXNcIjpcIktleXdvcmRFeGFtcGxlTGlzdF9fS2V5d29yZEV4YW1wbGVMaXN0X19leGFtcGxlc19fXzJRYmZxXCJ9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9LZXl3b3JkRXhhbXBsZUxpc3QvS2V5d29yZEV4YW1wbGVMaXN0LmNzc1xuICoqIG1vZHVsZSBpZCA9IDUxNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5jb25zdCBiYXNlbGluZSA9IDAuNzUwXG5cbmNvbnN0IEJsb2NrID0gKHtcbiAgbiA9IDEsXG4gIGV4dHJhQ2xhc3NOYW1lcyA9ICcnLFxuICBjaGlsZHJlblxufSkgPT4ge1xuICBjb25zdCBzdHlsZSA9IHtcbiAgICBtYXJnaW5Cb3R0b206IGAke2Jhc2VsaW5lICogbn1yZW1gXG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3N0eWxlfSBjbGFzc05hbWU9e2V4dHJhQ2xhc3NOYW1lc30+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgQmxvY2tcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9sYXlvdXRzL0Jsb2NrL0Jsb2NrLmpzeFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnXG5cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9RdWVyeVZpZXcuY3NzJ1xuaW1wb3J0IEV4YW1wbGVMaXN0IGZyb20gJy4uL0V4YW1wbGVMaXN0J1xuaW1wb3J0IEtleXdvcmRFeGFtcGxlTGlzdCBmcm9tICcuLi9LZXl3b3JkRXhhbXBsZUxpc3QnXG5pbXBvcnQgQmxvY2sgZnJvbSAnLi4vLi4vbGF5b3V0cy9CbG9jaydcbmltcG9ydCBUaXRsZSBmcm9tICcuLi9UaXRsZSdcblxuY29uc3QgUXVlcnlWaWV3ID0gKHtcbiAgZGlyZWN0RXhhbXBsZXMsXG4gIHJlbGF0ZWRFeGFtcGxlcyxcbiAgZm9jdXNlZEtleXdvcmRzXG59KSA9PiB7XG4gIGNvbnN0IG5vbktleXdvcmREaXJlY3RFeGFtcGxlcyA9IGRpcmVjdEV4YW1wbGVzLmZpbHRlcihlID0+IHtcbiAgICBmb3IgKGxldCBmayBvZiBmb2N1c2VkS2V5d29yZHMpIHtcbiAgICAgIGlmIChlLmltYWdlRGVzY3JpcHRpb25TdGVtcy5pbmRleE9mKGZrKSAhPT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfSlcblxuICBsZXQgZGlyZWN0RXhhbXBsZXNFbCA9ICcnXG4gIGlmIChub25LZXl3b3JkRGlyZWN0RXhhbXBsZXMubGVuZ3RoKSB7XG4gICAgZGlyZWN0RXhhbXBsZXNFbCA9IChcbiAgICAgIDxFeGFtcGxlTGlzdFxuICAgICAgICBuQ29scz17OH1cbiAgICAgICAgZXhhbXBsZXM9e25vbktleXdvcmREaXJlY3RFeGFtcGxlc30gLz5cbiAgICApXG4gIH1cblxuICBjb25zdCBub25LZXl3b3JkUmVsYXRlZEV4YW1wbGVzID0gcmVsYXRlZEV4YW1wbGVzLmZpbHRlcihlID0+IHtcbiAgICBmb3IgKGxldCBmayBvZiBmb2N1c2VkS2V5d29yZHMpIHtcbiAgICAgIGlmIChlLmltYWdlRGVzY3JpcHRpb25TdGVtcy5pbmRleE9mKGZrKSAhPT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfSlcblxuICBsZXQgcmVsYXRlZEV4YW1wbGVzRWwgPSAnJ1xuICBpZiAobm9uS2V5d29yZFJlbGF0ZWRFeGFtcGxlcy5sZW5ndGgpIHtcbiAgICByZWxhdGVkRXhhbXBsZXNFbCA9IChcbiAgICAgIDxFeGFtcGxlTGlzdFxuICAgICAgICBuQ29scz17OH1cbiAgICAgICAgZXhhbXBsZXM9e25vbktleXdvcmRSZWxhdGVkRXhhbXBsZXN9IC8+XG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLlF1ZXJ5Vmlld30+XG4gICAgICA8QmxvY2s+XG4gICAgICAgIDxCbG9jaz5cbiAgICAgICAgICA8VGl0bGUgdGl0bGU9XCJDb2xlY3RlZCBieSBicm93c2luZyBzZWFyY2ggcmVzdWx0c1wiIC8+XG4gICAgICAgIDwvQmxvY2s+XG5cbiAgICAgICAge2ZvY3VzZWRLZXl3b3Jkcy5tYXAoKGssIGluZGV4KSA9PlxuICAgICAgICAgIDxLZXl3b3JkRXhhbXBsZUxpc3RcbiAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICBrZXl3b3JkPXtrfVxuICAgICAgICAgICAgZXhhbXBsZXM9e2RpcmVjdEV4YW1wbGVzfSAvPlxuICAgICAgICApfVxuXG4gICAgICAgIHtkaXJlY3RFeGFtcGxlc0VsfVxuICAgICAgPC9CbG9jaz5cblxuICAgICAgPEJsb2NrPlxuICAgICAgICA8VGl0bGUgdGl0bGU9XCJDb2xlY3RlZCBieSBicm93c2luZyByZWxhdGVkIGltYWdlc1wiIC8+XG4gICAgICA8L0Jsb2NrPlxuXG4gICAgICB7Zm9jdXNlZEtleXdvcmRzLm1hcCgoaywgaW5kZXgpID0+XG4gICAgICAgIDxLZXl3b3JkRXhhbXBsZUxpc3RcbiAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgIGtleXdvcmQ9e2t9XG4gICAgICAgICAgZXhhbXBsZXM9e3JlbGF0ZWRFeGFtcGxlc30gLz5cbiAgICAgICl9XG5cbiAgICAgIHtyZWxhdGVkRXhhbXBsZXNFbH1cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxuICBzdGF0ZSA9PiB7XG4gICAgY29uc3QgZXhhbXBsZXMgPSBzdGF0ZS5kYXRhLmV4YW1wbGVzLmZpbHRlcihlID0+IHtcbiAgICAgIHJldHVybiBzdGF0ZS51aS5mb2N1c2VkUXVlcmllcy5pbmRleE9mKGUucXVlcnkpICE9PSAtMVxuICAgIH0pXG5cbiAgICByZXR1cm4ge1xuICAgICAgZm9jdXNlZEtleXdvcmRzOiBzdGF0ZS51aS5mb2N1c2VkS2V5d29yZHMsXG4gICAgICBkaXJlY3RFeGFtcGxlczogZXhhbXBsZXNcbiAgICAgICAgLmZpbHRlcihlID0+IGUucmVsZXZhbmNlID4gMClcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICBpZiAoYS5xdWVyeSA+IGIucXVlcnkpIHtcbiAgICAgICAgICAgIHJldHVybiAxXG4gICAgICAgICAgfSBlbHNlIGlmIChhLnF1ZXJ5IDwgYi5xdWVyeSkge1xuICAgICAgICAgICAgcmV0dXJuIC0xXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChhLmNyZWF0ZWRBdCA+IGIuY3JlYXRlZEF0KSB7XG4gICAgICAgICAgICAgIHJldHVybiAxXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gLTFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgcmVsYXRlZEV4YW1wbGVzOiBleGFtcGxlc1xuICAgICAgICAuZmlsdGVyKGUgPT4gZS5yZWxldmFuY2UgPT09IC0xKVxuICAgICAgICAuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgIGlmIChhLnF1ZXJ5ID4gYi5xdWVyeSkge1xuICAgICAgICAgICAgcmV0dXJuIDFcbiAgICAgICAgICB9IGVsc2UgaWYgKGEucXVlcnkgPCBiLnF1ZXJ5KSB7XG4gICAgICAgICAgICByZXR1cm4gLTFcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGEuY3JlYXRlZEF0ID4gYi5jcmVhdGVkQXQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDFcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiAtMVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG4gIH1cbikoUXVlcnlWaWV3KVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2NvbXBvbmVudHMvUXVlcnlWaWV3L1F1ZXJ5Vmlldy5qc3hcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJRdWVyeVZpZXdcIjpcIlF1ZXJ5Vmlld19fUXVlcnlWaWV3X19fM2FvbnpcIn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL1F1ZXJ5Vmlldy9RdWVyeVZpZXcuY3NzXG4gKiogbW9kdWxlIGlkID0gNTE4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9UaXRsZS5jc3MnXG5cbmNvbnN0IFRpdGxlID0gKHtcbiAgdGl0bGVcbn0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLlRpdGxlfT5cbiAgICAgIHt0aXRsZX1cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBUaXRsZVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2NvbXBvbmVudHMvVGl0bGUvVGl0bGUuanN4XG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiVGl0bGVcIjpcIlRpdGxlX19UaXRsZV9fXzE3QnVLXCJ9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9UaXRsZS9UaXRsZS5jc3NcbiAqKiBtb2R1bGUgaWQgPSA1MjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuY29uc3QgRmxleCA9ICh7XG4gIGZsZXhEaXJlY3Rpb24gPSAncm93JyxcbiAganVzdGlmeUNvbnRlbnQgPSAnZmxleC1zdGFydCcsXG4gIGFsaWduSXRlbXMgPSAnY2VudGVyJyxcbiAgY2hpbGRyZW5cbn0pID0+IHtcbiAgY29uc3Qgc3R5bGUgPSB7XG4gICAgZmxleERpcmVjdGlvbixcbiAgICBhbGlnbkl0ZW1zLFxuICAgIGp1c3RpZnlDb250ZW50LFxuICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICB3aWR0aDogJzEwMCUnLFxuICAgIGhlaWdodDogJzEwMCUnXG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3N0eWxlfT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBGbGV4XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvbGF5b3V0cy9GbGV4L0ZsZXguanN4XG4gKiovIiwiaW1wb3J0IGlvIGZyb20gJ3NvY2tldC5pby1jbGllbnQnXG5cbmNvbnN0IHNvY2tldCA9IGlvKCdodHRwczovL3Zkeml1YmFrLmNvbS8nLCB7cGF0aDogJy9kZXNpZ25GaXhhdGlvblNlcnZlcid9KVxuXG5leHBvcnQgZGVmYXVsdCBzb2NrZXRcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9zdG9yZS9zb2NrZXQuanNcbiAqKi8iLCJpbXBvcnQgcmFuZG9tY29sb3IgZnJvbSAncmFuZG9tY29sb3InXG4vLyBpbXBvcnQgYWxnb2xpYXNlYXJjaCBmcm9tICdhbGdvbGlhc2VhcmNoJ1xuLy9cbi8vIGNvbnN0IGNsaWVudCA9IGFsZ29saWFzZWFyY2goJzc0UzFKTkIxWlQnLCAnM2RlNmZkYmFmYzQ3N2NmMDE5NjczYmI4MTA0M2FlMGQnKVxuLy8gY29uc3QgaW5kZXggPSBjbGllbnQuaW5pdEluZGV4KCdEZXNpZ25GaXhhdGlvblN0dWR5VGFza3MnKVxuXG5leHBvcnQgY29uc3QgUkVDRUlWRV9EQVRBID0gJ1JFQ0VJVkVfREFUQSdcbmV4cG9ydCBjb25zdCBSRUNFSVZFX1FVRVJZX1RBU0sgPSAnUkVDRUlWRV9RVUVSWV9UQVNLJ1xuZXhwb3J0IGNvbnN0IFJFQ0VJVkVfRVhBTVBMRSA9ICdSRUNFSVZFX0VYQU1QTEUnXG5leHBvcnQgY29uc3QgUkVDRUlWRV9RVUVSWSA9ICdSRUNFSVZFX1FVRVJZJ1xuZXhwb3J0IGNvbnN0IElOQ19FWEFNUExFX0NPVU5URVIgPSAnSU5DX0VYQU1QTEVfQ09VTlRFUidcblxuZXhwb3J0IGNvbnN0IHJlY2VpdmVFeGFtcGxlID0gKGV4YW1wbGUpID0+IHtcbiAgcmV0dXJuIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBjb25zb2xlLmxvZyhleGFtcGxlKVxuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IElOQ19FWEFNUExFX0NPVU5URVIsXG4gICAgICBxdWVyeTogZXhhbXBsZS5xdWVyeVxuICAgIH0pXG5cbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBSRUNFSVZFX0VYQU1QTEUsXG4gICAgICBleGFtcGxlXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgcmVjZWl2ZVF1ZXJ5ID0gKHF1ZXJ5KSA9PiB7XG4gIHJldHVybiBkaXNwYXRjaCA9PiB7XG4gICAgY29uc29sZS5sb2cocXVlcnkpXG4gICAgY29uc3QgY29sb3IgPSByYW5kb21jb2xvcih7XG4gICAgICBsdW1pbm9zaXR5OiAnYnJpZ2h0JyxcbiAgICAgIGZvcm1hdDogJ3JnYidcbiAgICB9KVxuXG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogUkVDRUlWRV9RVUVSWSxcbiAgICAgIHF1ZXJ5OiBPYmplY3QuYXNzaWduKHt9LCBxdWVyeSwge1xuICAgICAgICBleGFtcGxlc0NvdW50OiAwLFxuICAgICAgICBjb2xvclxuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCByZWNlaXZlRGF0YSA9IChxdWVyaWVzLCBleGFtcGxlcywgdGFzaykgPT4ge1xuICByZXR1cm4gZGlzcGF0Y2ggPT4ge1xuICAgIGNvbnN0IGNvbG9ycyA9IHJhbmRvbWNvbG9yKHtcbiAgICAgIGNvdW50OiBxdWVyaWVzLmxlbmd0aCxcbiAgICAgIGx1bWlub3NpdHk6ICdicmlnaHQnLFxuICAgICAgZm9ybWF0OiAncmdiJ1xuICAgIH0pXG5cbiAgICBjb25zdCBlbmhhbmNlZFF1ZXJpZXMgPSBxdWVyaWVzLm1hcCgocSwgaW5kZXgpID0+IE9iamVjdC5hc3NpZ24oe30sIHEsIHtcbiAgICAgIGV4YW1wbGVzQ291bnQ6IGV4YW1wbGVzLmZpbHRlcihlID0+IGUucXVlcnkgPT09IHEucXVlcnkpLmxlbmd0aCxcbiAgICAgIGNvbG9yOiBjb2xvcnNbaW5kZXhdXG4gICAgfSkpXG5cbiAgICAvLyBmb3IgKGxldCBxdWVyeSBvZiBxdWVyaWVzKSB7XG4gICAgLy8gICBpbmRleC5zZWFyY2gocXVlcnkucXVlcnksIChlcnIsIGNvbnRlbnQpID0+IHtcbiAgICAvLyAgICAgaWYgKGNvbnRlbnQuaGl0cy5sZW5ndGgpIHtcbiAgICAvLyAgICAgICBjb25zdCBtYXRjaGVkVGFzayA9IGNvbnRlbnQuaGl0cy5maWx0ZXIoaCA9PiBoLnRhc2tBbGlhcyA9PT0gdGFzay5hbGlhcylbMF1cbiAgICAvL1xuICAgIC8vICAgICAgIGRpc3BhdGNoKHtcbiAgICAvLyAgICAgICAgIHR5cGU6IFJFQ0VJVkVfUVVFUllfVEFTSyxcbiAgICAvLyAgICAgICAgIG1hdGNoZWRUYXNrOiBtYXRjaGVkVGFzay5faGlnaGxpZ2h0UmVzdWx0LnRleHQudmFsdWUsXG4gICAgLy8gICAgICAgICBxdWVyeTogcXVlcnkucXVlcnlcbiAgICAvLyAgICAgICB9KVxuICAgIC8vICAgICB9XG4gICAgLy8gICB9KVxuICAgIC8vIH1cblxuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFJFQ0VJVkVfREFUQSxcbiAgICAgIHF1ZXJpZXM6IGVuaGFuY2VkUXVlcmllcyxcbiAgICAgIGV4YW1wbGVzLFxuICAgICAgdGFza1xuICAgIH0pXG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9zdG9yZS9kYXRhQWN0aW9ucy5qc1xuICoqLyIsImV4cG9ydCBjb25zdCBSRUNFSVZFX1NUVURZID0gJ1JFQ0VJVkVfU1RVRFknXG5leHBvcnQgY29uc3QgS0lMTF9TVFVEWSA9ICdLSUxMX1NUVURZJ1xuXG5leHBvcnQgY29uc3QgcmVjZWl2ZVN0dWR5ID0gKFxuICBwYXJ0aWNpcGFudElkLFxuICBzZXNzaW9uSWQsXG4gIGNvbmRpdGlvbixcbiAgdGFza0FsaWFzXG4pID0+IHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBSRUNFSVZFX1NUVURZLFxuICAgIHBhcnRpY2lwYW50SWQsXG4gICAgc2Vzc2lvbklkLFxuICAgIGNvbmRpdGlvbixcbiAgICB0YXNrQWxpYXNcbiAgfVxufVxuXG5leHBvcnQgY29uc3Qga2lsbFN0dWR5ID0gKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEtJTExfU1RVRFlcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL3N0b3JlL3N0dWR5QWN0aW9ucy5qc1xuICoqLyIsImltcG9ydCB7Y3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZX0gZnJvbSAncmVkdXgnXG5pbXBvcnQgY3JlYXRlTG9nZ2VyIGZyb20gJ3JlZHV4LWxvZ2dlcidcbmltcG9ydCB0aHVua01pZGRsZXdhcmUgZnJvbSAncmVkdXgtdGh1bmsnXG5pbXBvcnQgcm9vdFJlZHVjZXIgZnJvbSAnLi9yb290UmVkdWNlcidcblxuY29uc3QgbWlkZGxld2FyZSA9IFt0aHVua01pZGRsZXdhcmVdXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xuICBjb25zdCBsb2dnZXIgPSBjcmVhdGVMb2dnZXIoKVxuICBtaWRkbGV3YXJlLnB1c2gobG9nZ2VyKVxufVxuXG5jb25zdCBjb25maWd1cmVTdG9yZSA9IChpbml0aWFsU3RhdGUpID0+IHtcbiAgcmV0dXJuIGNyZWF0ZVN0b3JlKFxuICAgIHJvb3RSZWR1Y2VyLFxuICAgIGluaXRpYWxTdGF0ZSxcbiAgICBhcHBseU1pZGRsZXdhcmUoLi4ubWlkZGxld2FyZSlcbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25maWd1cmVTdG9yZVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL3N0b3JlL3N0b3JlLmpzXG4gKiovIiwiaW1wb3J0IHtjb21iaW5lUmVkdWNlcnN9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IGRhdGEgZnJvbSAnLi9kYXRhUmVkdWNlcidcbmltcG9ydCB1aSBmcm9tICcuL3VpUmVkdWNlcidcbmltcG9ydCBzdHVkeSBmcm9tICcuL3N0dWR5UmVkdWNlcidcblxuY29uc3Qgcm9vdFJlZHVjZXIgPSBjb21iaW5lUmVkdWNlcnMoe1xuICBkYXRhLFxuICB1aSxcbiAgc3R1ZHlcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IHJvb3RSZWR1Y2VyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvc3RvcmUvcm9vdFJlZHVjZXIuanNcbiAqKi8iLCJpbXBvcnQge1xuICBSRUNFSVZFX0RBVEEsXG4gIFJFQ0VJVkVfUVVFUllfVEFTSyxcbiAgUkVDRUlWRV9FWEFNUExFLFxuICBSRUNFSVZFX1FVRVJZLFxuICBJTkNfRVhBTVBMRV9DT1VOVEVSXG59IGZyb20gJy4vZGF0YUFjdGlvbnMnXG5pbXBvcnQgaW5pdGlhbFN0YXRlIGZyb20gJy4vaW5pdGlhbFN0YXRlJ1xuXG5jb25zdCBkYXRhID0gKFxuICBzdGF0ZSA9IGluaXRpYWxTdGF0ZS5kYXRhLFxuICBhY3Rpb25cbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBSRUNFSVZFX0RBVEE6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgcXVlcmllczogYWN0aW9uLnF1ZXJpZXMsXG4gICAgICAgIGV4YW1wbGVzOiBhY3Rpb24uZXhhbXBsZXMsXG4gICAgICAgIHRhc2s6IGFjdGlvbi50YXNrLFxuICAgICAgICBzdGVtRGljdGlvbmFyeTogYWN0aW9uLmV4YW1wbGVzLnJlZHVjZSgoY2FycnksIGN1cnJlbnQpID0+IHtcbiAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgY2FycnksIGN1cnJlbnQuc3RlbURpY3Rpb25hcnkpXG4gICAgICAgIH0sIHN0YXRlLnN0ZW1EaWN0aW9uYXJ5KVxuICAgICAgfSlcbiAgICBjYXNlIFJFQ0VJVkVfRVhBTVBMRTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBleGFtcGxlczogW1xuICAgICAgICAgIC4uLnN0YXRlLmV4YW1wbGVzLFxuICAgICAgICAgIGFjdGlvbi5leGFtcGxlXG4gICAgICAgIF0sXG4gICAgICAgIHN0ZW1EaWN0aW9uYXJ5OiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5zdGVtRGljdGlvbmFyeSwgYWN0aW9uLmV4YW1wbGUuc3RlbURpY3Rpb25hcnkpXG4gICAgICB9KVxuICAgIGNhc2UgUkVDRUlWRV9RVUVSWTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBxdWVyaWVzOiBbXG4gICAgICAgICAgLi4uc3RhdGUucXVlcmllcyxcbiAgICAgICAgICBhY3Rpb24ucXVlcnlcbiAgICAgICAgXVxuICAgICAgfSlcbiAgICBjYXNlIElOQ19FWEFNUExFX0NPVU5URVI6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgcXVlcmllczogc3RhdGUucXVlcmllcy5tYXAocSA9PiB7XG4gICAgICAgICAgaWYgKHEucXVlcnkgPT09IGFjdGlvbi5xdWVyeSkge1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHEsIHtcbiAgICAgICAgICAgICAgZXhhbXBsZXNDb3VudDogcS5leGFtcGxlc0NvdW50ICsgMVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHFcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIGNhc2UgUkVDRUlWRV9RVUVSWV9UQVNLOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHF1ZXJpZXM6IHN0YXRlLnF1ZXJpZXMubWFwKHEgPT4ge1xuICAgICAgICAgIGlmIChxLnF1ZXJ5ID09PSBhY3Rpb24ucXVlcnkpIHtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBxLCB7XG4gICAgICAgICAgICAgIG1hdGNoZWRUYXNrOiBhY3Rpb24ubWF0Y2hlZFRhc2tcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBxXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZGF0YVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL3N0b3JlL2RhdGFSZWR1Y2VyLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQge1xuICBkYXRhOiB7XG4gICAgcXVlcmllczogW10sXG4gICAgZXhhbXBsZXM6IFtdLFxuICAgIHRhc2s6IHt9LFxuICAgIHN0ZW1EaWN0aW9uYXJ5OiB7fVxuICB9LFxuICB1aToge1xuICAgIGhpZ2hsaWdodGVkUXVlcnk6IG51bGwsXG4gICAgZm9jdXNlZFF1ZXJpZXM6IFtdLFxuICAgIGZvY3VzZWRLZXl3b3JkczogW11cbiAgfSxcbiAgc3R1ZHk6IHtcbiAgICBwYXJ0aWNpcGFudElkOiAnJyxcbiAgICBzZXNzaW9uSWQ6IG51bGwsXG4gICAgY29uZGl0aW9uOiAnYmFzZWxpbmUnLFxuICAgIHRhc2tBbGlhczogJydcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL3N0b3JlL2luaXRpYWxTdGF0ZS5qc1xuICoqLyIsImltcG9ydCB7XG4gIFRPR0dMRV9ISUdITElHSFRfUVVFUlksXG4gIFRPR0dMRV9GT0NVU19RVUVSWSxcbiAgVE9HR0xFX0ZPQ1VTX0tFWVdPUkQsXG4gIENMRUFSX0ZPQ1VTRURfUVVFUklFUyxcbiAgQ0xFQVJfRk9DVVNFRF9LRVlXT1JEU1xufSBmcm9tICcuL3VpQWN0aW9ucydcbmltcG9ydCBpbml0aWFsU3RhdGUgZnJvbSAnLi9pbml0aWFsU3RhdGUnXG5cbmNvbnN0IHVpID0gKFxuICBzdGF0ZSA9IGluaXRpYWxTdGF0ZS51aSxcbiAgYWN0aW9uXG4pID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgVE9HR0xFX0hJR0hMSUdIVF9RVUVSWTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBoaWdobGlnaHRlZFF1ZXJ5OiBhY3Rpb24ucXVlcnkgPT09IHN0YXRlLmhpZ2hsaWdodGVkUXVlcnkgPyBudWxsIDogYWN0aW9uLnF1ZXJ5XG4gICAgICB9KVxuICAgIGNhc2UgVE9HR0xFX0ZPQ1VTX1FVRVJZOlxuICAgICAgY29uc3QgdGFyZ2V0UXVlcnlJbmRleCA9IHN0YXRlLmZvY3VzZWRRdWVyaWVzLmluZGV4T2YoYWN0aW9uLnF1ZXJ5KVxuICAgICAgbGV0IGZvY3VzZWRRdWVyaWVzID0gW11cbiAgICAgIGlmICh0YXJnZXRRdWVyeUluZGV4ID09PSAtMSkge1xuICAgICAgICBmb2N1c2VkUXVlcmllcyA9IFtcbiAgICAgICAgICAuLi5zdGF0ZS5mb2N1c2VkUXVlcmllcyxcbiAgICAgICAgICBhY3Rpb24ucXVlcnlcbiAgICAgICAgXVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9jdXNlZFF1ZXJpZXMgPSBbXG4gICAgICAgICAgLi4uc3RhdGUuZm9jdXNlZFF1ZXJpZXMuc2xpY2UoMCwgdGFyZ2V0UXVlcnlJbmRleCksXG4gICAgICAgICAgLi4uc3RhdGUuZm9jdXNlZFF1ZXJpZXMuc2xpY2UodGFyZ2V0UXVlcnlJbmRleCArIDEpXG4gICAgICAgIF1cbiAgICAgIH1cbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBmb2N1c2VkUXVlcmllc1xuICAgICAgfSlcbiAgICBjYXNlIFRPR0dMRV9GT0NVU19LRVlXT1JEOlxuICAgICAgY29uc3QgdGFyZ2V0S2V5d29yZEluZGV4ID0gc3RhdGUuZm9jdXNlZEtleXdvcmRzLmluZGV4T2YoYWN0aW9uLmtleXdvcmQpXG4gICAgICBsZXQgZm9jdXNlZEtleXdvcmRzID0gW11cbiAgICAgIGlmICh0YXJnZXRLZXl3b3JkSW5kZXggPT09IC0xKSB7XG4gICAgICAgIGZvY3VzZWRLZXl3b3JkcyA9IFtcbiAgICAgICAgICAuLi5zdGF0ZS5mb2N1c2VkS2V5d29yZHMsXG4gICAgICAgICAgYWN0aW9uLmtleXdvcmRcbiAgICAgICAgXVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9jdXNlZEtleXdvcmRzID0gW1xuICAgICAgICAgIC4uLnN0YXRlLmZvY3VzZWRLZXl3b3Jkcy5zbGljZSgwLCB0YXJnZXRLZXl3b3JkSW5kZXgpLFxuICAgICAgICAgIC4uLnN0YXRlLmZvY3VzZWRLZXl3b3Jkcy5zbGljZSh0YXJnZXRLZXl3b3JkSW5kZXggKyAxKVxuICAgICAgICBdXG4gICAgICB9XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgZm9jdXNlZEtleXdvcmRzXG4gICAgICB9KVxuICAgIGNhc2UgQ0xFQVJfRk9DVVNFRF9RVUVSSUVTOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGZvY3VzZWRRdWVyaWVzOiBpbml0aWFsU3RhdGUudWkuZm9jdXNlZFF1ZXJpZXNcbiAgICAgIH0pXG4gICAgY2FzZSBDTEVBUl9GT0NVU0VEX0tFWVdPUkRTOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGZvY3VzZWRLZXl3b3JkczogaW5pdGlhbFN0YXRlLnVpLmZvY3VzZWRLZXl3b3Jkc1xuICAgICAgfSlcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgdWlcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9zdG9yZS91aVJlZHVjZXIuanNcbiAqKi8iLCJpbXBvcnQge1JFQ0VJVkVfU1RVRFksIEtJTExfU1RVRFl9IGZyb20gJy4vc3R1ZHlBY3Rpb25zJ1xuaW1wb3J0IGluaXRpYWxTdGF0ZSBmcm9tICcuL2luaXRpYWxTdGF0ZSdcblxuY29uc3Qgc3R1ZHkgPSAoXG4gIHN0YXRlID0gaW5pdGlhbFN0YXRlLnN0dWR5LFxuICBhY3Rpb25cbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBSRUNFSVZFX1NUVURZOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHBhcnRpY2lwYW50SWQ6IGFjdGlvbi5wYXJ0aWNpcGFudElkLFxuICAgICAgICBzZXNzaW9uSWQ6IGFjdGlvbi5zZXNzaW9uSWQsXG4gICAgICAgIGNvbmRpdGlvbjogYWN0aW9uLmNvbmRpdGlvbixcbiAgICAgICAgdGFza0FsaWFzOiBhY3Rpb24udGFza0FsaWFzXG4gICAgICB9KVxuICAgIGNhc2UgS0lMTF9TVFVEWTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBzZXNzaW9uSWQ6IG51bGxcbiAgICAgIH0pXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0dWR5XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvc3RvcmUvc3R1ZHlSZWR1Y2VyLmpzXG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3N0eWxlcy9yZXNldC5jc3NcbiAqKiBtb2R1bGUgaWQgPSA1ODJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBREE7Ozs7Ozs7Ozs7Ozs7OztBQ2JBO0FBQ0E7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7OztBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFHQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBSUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFGQTtBQUFBO0FBTEE7QUFEQTtBQWdCQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBTUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFGQTtBQUFBO0FBTEE7QUFEQTtBQWdCQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBbkRBO0FBMERBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUEzREE7QUFnRUE7Ozs7QUEvR0E7QUFDQTtBQWlIQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBT0E7Ozs7Ozs7QUM3SUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ0RBO0FBQ0E7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUNBO0FBR0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBSUE7QUFMQTtBQVFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFGQTtBQUlBOzs7Ozs7O0FDL0NBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ0RBO0FBQ0E7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUhBO0FBREE7QUFRQTs7OztBQWJBO0FBQ0E7QUFlQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBREE7QUFHQTs7Ozs7OztBQzNCQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUNBO0FBSUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFJQTtBQUpBO0FBQUE7QUFPQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTs7Ozs7OztBQzNDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7Ozs7Ozs7Ozs7Ozs7QUNyQ0E7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBSEE7QUFEQTtBQVFBOzs7O0FBYkE7QUFDQTtBQWVBO0FBRUE7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBVUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQXJCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFzQkE7QUFDQTtBQUFBO0FBQUE7QUFEQTtBQUdBOzs7Ozs7O0FDakRBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNEQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQ0E7QUFLQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBR0E7QUFIQTtBQUFBO0FBTUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTs7Ozs7OztBQzFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFTQTs7Ozs7Ozs7Ozs7Ozs7O0FDMUJBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQUNBO0FBR0E7QUFBQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFEQTtBQUhBO0FBREE7QUFEQTtBQWlCQTs7OztBQWpDQTtBQUNBO0FBbUNBOzs7Ozs7O0FDekNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNEQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQ0E7QUFPQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFNQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBWEE7QUFnQkE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBSEE7QUFLQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFPQTs7Ozs7OztBQzFEQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7QUFHQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFKQTtBQU9BO0FBQ0E7QUFDQTtBQVZBO0FBYUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRkE7QUFJQTs7Ozs7OztBQzNDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBTEE7QUFEQTtBQWNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFEQTtBQUdBOzs7Ozs7O0FDMUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNEQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUlBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDbkJBO0FBQ0E7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBO0FBSUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFJQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBSkE7QUFPQTtBQVpBO0FBZUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUlBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFKQTtBQU9BO0FBM0JBO0FBOEJBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQS9CQTtBQWlDQTs7Ozs7OztBQzVIQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBSUE7QUFDQTs7Ozs7Ozs7QUNiQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTs7Ozs7QUFDQTtBQUtBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBQ0E7QUFRQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBSUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUN2QkE7QUFDQTs7Ozs7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0hBO0FBQ0E7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFLQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFGQTtBQUFBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7Ozs7Ozs7Ozs7Ozs7QUM5RUE7QUFDQTtBQUNBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBOzs7Ozs7Ozs7Ozs7O0FDdEJBO0FBQ0E7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDbkJBO0FBQ0E7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQUtBOzs7Ozs7Ozs7Ozs7Ozs7QUNYQTtBQUNBO0FBTUE7QUFDQTs7Ozs7OztBQUNBO0FBR0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFRQTtBQUNBO0FBQ0E7QUFJQTtBQUxBO0FBT0E7QUFDQTtBQUNBO0FBREE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFXQTtBQUNBO0FBbERBO0FBb0RBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBWkE7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFNQTtBQUNBOzs7Ozs7O0FBQ0E7QUFHQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQWhEQTtBQWtEQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDaEVBO0FBQ0E7QUFBQTtBQUNBOzs7OztBQUNBO0FBR0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQWJBO0FBZUE7QUFDQTs7Ozs7Ozs7QUN2QkE7Ozs7Iiwic291cmNlUm9vdCI6IiJ9