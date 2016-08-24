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

	var _store = __webpack_require__(605);

	var _store2 = _interopRequireDefault(_store);

	var _reactRedux = __webpack_require__(472);

	__webpack_require__(613);

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

	var _Flex = __webpack_require__(614);

	var _Flex2 = _interopRequireDefault(_Flex);

	var _socket = __webpack_require__(521);

	var _socket2 = _interopRequireDefault(_socket);

	var _dataActions = __webpack_require__(570);

	var _uiActions = __webpack_require__(502);

	var _studyActions = __webpack_require__(604);

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
	        _socket2.default.emit('get data', { sessionId: data.sessionId, taskAlias: data.taskAlias });
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

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
	  var stemDictionary = examples.reduce(function (carry, current) {
	    return _extends({}, carry, current.stemDictionary);
	  }, {});

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
	          keyword: stemDictionary[stem],
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

	  console.log(keywords);

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

	  var classNames = [_Keyword2.default.Keyword];
	  if (focusedKeywords.indexOf(keyword.keyword) !== -1) {
	    classNames.push(_Keyword2.default.Keyword_isFocused);
	  }

	  return _react2.default.createElement(
	    'div',
	    {
	      onClick: toggleFocus,
	      className: classNames.join(' ') },
	    keyword.keyword,
	    ' (',
	    keyword.frequency,
	    ')'
	  );
	};

	exports.default = (0, _reactRedux.connect)(function (state) {
	  return {
	    focusedKeywords: state.ui.focusedKeywords
	  };
	}, function (dispatch, ownProps) {
	  var keyword = ownProps.keyword.keyword;


	  return {
	    toggleFocus: function toggleFocus() {
	      dispatch((0, _uiActions.toggleFocusKeyword)(keyword));
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

	  var focusedKeywordsRegexp = new RegExp('(' + focusedKeywords.join('|') + ')');
	  var nonKeywordExamples = examples.filter(function (e) {
	    return !focusedKeywordsRegexp.test(e.imageDescription);
	  });

	  return _react2.default.createElement(
	    'div',
	    { className: _KeywordView2.default.KeywordView },
	    focusedKeywords.map(function (k, index) {
	      return _react2.default.createElement(_KeywordExampleList2.default, {
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

	  var filteredExamples = examples.filter(function (e) {
	    return e.imageDescription.indexOf(keyword) !== -1;
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
	          keyword
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

	exports.default = KeywordExampleList;

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

	  var focusedKeywordsRegexp = new RegExp('(' + focusedKeywords.join('|') + ')');

	  var nonKeywordDirectExamples = directExamples.filter(function (e) {
	    return !focusedKeywords.length || !focusedKeywordsRegexp.test(e.imageDescription);
	  });
	  var directExamplesEl = '';
	  if (nonKeywordDirectExamples.length) {
	    directExamplesEl = _react2.default.createElement(_ExampleList2.default, {
	      nCols: 8,
	      examples: nonKeywordDirectExamples });
	  }

	  var nonKeywordRelatedExamples = relatedExamples.filter(function (e) {
	    return !focusedKeywords.length || !focusedKeywordsRegexp.test(e.imageDescription);
	  });
	  var relatedExamplesEl = '';
	  if (nonKeywordDirectExamples.length) {
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

	var _socket = __webpack_require__(522);

	var _socket2 = _interopRequireDefault(_socket);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var socket = (0, _socket2.default)('https://vdziubak.com/', { path: '/designFixationServer' });

	exports.default = socket;

/***/ },

/***/ 570:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.receiveData = exports.receiveQuery = exports.receiveExample = exports.INC_EXAMPLE_COUNTER = exports.RECEIVE_QUERY = exports.RECEIVE_EXAMPLE = exports.RECEIVE_QUERY_TASK = exports.RECEIVE_DATA = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _randomcolor = __webpack_require__(571);

	var _randomcolor2 = _interopRequireDefault(_randomcolor);

	var _algoliasearch = __webpack_require__(572);

	var _algoliasearch2 = _interopRequireDefault(_algoliasearch);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var client = (0, _algoliasearch2.default)('74S1JNB1ZT', '3de6fdbafc477cf019673bb81043ae0d');
	var index = client.initIndex('DesignFixationStudyTasks');

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

/***/ 604:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var RECEIVE_STUDY = exports.RECEIVE_STUDY = 'RECEIVE_STUDY';

	var receiveStudy = exports.receiveStudy = function receiveStudy(participantId, sessionId, condition, taskAlias) {
	  return {
	    type: RECEIVE_STUDY,
	    participantId: participantId,
	    sessionId: sessionId,
	    condition: condition,
	    taskAlias: taskAlias
	  };
		};

/***/ },

/***/ 605:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(479);

	var _reduxLogger = __webpack_require__(606);

	var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

	var _reduxThunk = __webpack_require__(607);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _rootReducer = __webpack_require__(608);

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

/***/ 608:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(479);

	var _dataReducer = __webpack_require__(609);

	var _dataReducer2 = _interopRequireDefault(_dataReducer);

	var _uiReducer = __webpack_require__(611);

	var _uiReducer2 = _interopRequireDefault(_uiReducer);

	var _studyReducer = __webpack_require__(612);

	var _studyReducer2 = _interopRequireDefault(_studyReducer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var rootReducer = (0, _redux.combineReducers)({
	  data: _dataReducer2.default,
	  ui: _uiReducer2.default,
	  study: _studyReducer2.default
	});

		exports.default = rootReducer;

/***/ },

/***/ 609:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _dataActions = __webpack_require__(570);

	var _initialState = __webpack_require__(610);

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
	        task: action.task
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

/***/ 610:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  data: {
	    queries: [],
	    examples: [],
	    task: {}
	  },
	  ui: {
	    highlightedQuery: null,
	    focusedQueries: [],
	    focusedKeywords: []
	  },
	  study: {
	    participantId: 'test',
	    sessionId: 'test',
	    condition: 'system',
	    taskAlias: 'cars'
	  }
		};

/***/ },

/***/ 611:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _uiActions = __webpack_require__(502);

	var _initialState = __webpack_require__(610);

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

/***/ 612:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _studyActions = __webpack_require__(604);

	var _initialState = __webpack_require__(610);

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
	    default:
	      return state;
	  }
	};

	exports.default = study;

/***/ },

/***/ 613:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 614:
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

/***/ }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvQXBwL0FwcC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQXBwL0FwcC5jc3MiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL1Rhc2tEZXNjcmlwdGlvbi9UYXNrRGVzY3JpcHRpb24uanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1Rhc2tEZXNjcmlwdGlvbi9UYXNrRGVzY3JpcHRpb24uY3NzIiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9RdWVyeUxpc3QvUXVlcnlMaXN0LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9RdWVyeUxpc3QvUXVlcnlMaXN0LmNzcyIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvUXVlcnkvUXVlcnkuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1F1ZXJ5L1F1ZXJ5LmNzcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3VpQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvS2V5d29yZExpc3QvS2V5d29yZExpc3QuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0tleXdvcmRMaXN0L0tleXdvcmRMaXN0LmNzcyIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvS2V5d29yZC9LZXl3b3JkLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9LZXl3b3JkL0tleXdvcmQuY3NzIiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9Db2xsZWN0aW9uVmlldy9Db2xsZWN0aW9uVmlldy5qc3giLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL0V4YW1wbGVMaXN0L0V4YW1wbGVMaXN0LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9FeGFtcGxlTGlzdC9FeGFtcGxlTGlzdC5jc3MiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL0V4YW1wbGUvRXhhbXBsZS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRXhhbXBsZS9FeGFtcGxlLmNzcyIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvS2V5d29yZFZpZXcvS2V5d29yZFZpZXcuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0tleXdvcmRWaWV3L0tleXdvcmRWaWV3LmNzcyIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvS2V5d29yZEV4YW1wbGVMaXN0L0tleXdvcmRFeGFtcGxlTGlzdC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvS2V5d29yZEV4YW1wbGVMaXN0L0tleXdvcmRFeGFtcGxlTGlzdC5jc3MiLCJ3ZWJwYWNrOi8vL3NyYy9sYXlvdXRzL0Jsb2NrL0Jsb2NrLmpzeCIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvUXVlcnlWaWV3L1F1ZXJ5Vmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvUXVlcnlWaWV3L1F1ZXJ5Vmlldy5jc3MiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL1RpdGxlL1RpdGxlLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9UaXRsZS9UaXRsZS5jc3MiLCJ3ZWJwYWNrOi8vL3NyYy9zdG9yZS9zb2NrZXQuanMiLCJ3ZWJwYWNrOi8vL3NyYy9zdG9yZS9kYXRhQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3N0dWR5QWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3N0b3JlLmpzIiwid2VicGFjazovLy9zcmMvc3RvcmUvcm9vdFJlZHVjZXIuanMiLCJ3ZWJwYWNrOi8vL3NyYy9zdG9yZS9kYXRhUmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL2luaXRpYWxTdGF0ZS5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3VpUmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3N0dWR5UmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL3Jlc2V0LmNzcyIsIndlYnBhY2s6Ly8vc3JjL2xheW91dHMvRmxleC9GbGV4LmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2JhYmVsLXBvbHlmaWxsJ1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJ1xuaW1wb3J0IEFwcCBmcm9tICcuL2NvbXBvbmVudHMvQXBwJ1xuaW1wb3J0IGNvbmZpZ3VyZVN0b3JlIGZyb20gJy4vc3RvcmUnXG5pbXBvcnQge1Byb3ZpZGVyfSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0ICcuL3N0eWxlcy9yZXNldC5jc3MnXG5cbmNvbnN0IHN0b3JlID0gY29uZmlndXJlU3RvcmUoKVxuXG5SZWFjdERPTS5yZW5kZXIoKFxuICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICA8QXBwIC8+XG4gIDwvUHJvdmlkZXI+XG4pLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzaWduRml4YXRpb25BcHAnKSlcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9pbmRleC5qc3hcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4J1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vQXBwLmNzcydcbmltcG9ydCBUYXNrRGVzY3JpcHRpb24gZnJvbSAnLi4vVGFza0Rlc2NyaXB0aW9uJ1xuaW1wb3J0IFF1ZXJ5TGlzdCBmcm9tICcuLi9RdWVyeUxpc3QnXG5pbXBvcnQgS2V5d29yZExpc3QgZnJvbSAnLi4vS2V5d29yZExpc3QnXG5pbXBvcnQgQ29sbGVjdGlvblZpZXcgZnJvbSAnLi4vQ29sbGVjdGlvblZpZXcnXG5pbXBvcnQgS2V5d29yZFZpZXcgZnJvbSAnLi4vS2V5d29yZFZpZXcnXG5pbXBvcnQgUXVlcnlWaWV3IGZyb20gJy4uL1F1ZXJ5VmlldydcbmltcG9ydCBUaXRsZSBmcm9tICcuLi9UaXRsZSdcbmltcG9ydCBGbGV4IGZyb20gJy4uLy4uL2xheW91dHMvRmxleCdcblxuaW1wb3J0IHNvY2tldCBmcm9tICcuLi8uLi9zdG9yZS9zb2NrZXQnXG5pbXBvcnQge3JlY2VpdmVEYXRhLCByZWNlaXZlRXhhbXBsZSwgcmVjZWl2ZVF1ZXJ5fSBmcm9tICcuLi8uLi9zdG9yZS9kYXRhQWN0aW9ucydcbmltcG9ydCB7Y2xlYXJGb2N1c2VkUXVlcmllcywgY2xlYXJGb2N1c2VkS2V5d29yZHN9IGZyb20gJy4uLy4uL3N0b3JlL3VpQWN0aW9ucydcbmltcG9ydCB7cmVjZWl2ZVN0dWR5fSBmcm9tICcuLi8uLi9zdG9yZS9zdHVkeUFjdGlvbnMnXG5cbmNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudFdpbGxNb3VudCAoKSB7XG4gICAgY29uc3Qge2Rpc3BhdGNofSA9IHRoaXMucHJvcHNcblxuICAgIHNvY2tldC5lbWl0KCdnZXQgc3R1ZHknKVxuXG4gICAgc29ja2V0Lm9uKCdzdHVkeScsIChkYXRhKSA9PiB7XG4gICAgICBkaXNwYXRjaChyZWNlaXZlU3R1ZHkoZGF0YS5wYXJ0aWNpcGFudElkLCBkYXRhLnNlc3Npb25JZCwgZGF0YS5jb25kaXRpb24sIGRhdGEudGFza0FsaWFzKSlcbiAgICAgIHNvY2tldC5lbWl0KCdnZXQgZGF0YScsIHtzZXNzaW9uSWQ6IGRhdGEuc2Vzc2lvbklkLCB0YXNrQWxpYXM6IGRhdGEudGFza0FsaWFzfSlcbiAgICB9KVxuXG4gICAgc29ja2V0Lm9uKCdjb25maXJtIGNyZWF0ZSBleGFtcGxlJywgZSA9PiB7XG4gICAgICBkaXNwYXRjaChyZWNlaXZlRXhhbXBsZShlKSlcbiAgICB9KVxuXG4gICAgc29ja2V0Lm9uKCdjb25maXJtIGNyZWF0ZSBxdWVyeScsIHEgPT4ge1xuICAgICAgZGlzcGF0Y2gocmVjZWl2ZVF1ZXJ5KHEpKVxuICAgIH0pXG5cbiAgICBzb2NrZXQub24oJ2RhdGEnLCAoZGF0YSkgPT4ge1xuICAgICAgZGlzcGF0Y2gocmVjZWl2ZURhdGEoZGF0YS5xdWVyaWVzLCBkYXRhLmV4YW1wbGVzLCBkYXRhLnRhc2spKVxuICAgIH0pXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHtmb2N1c2VkUXVlcmllcywgZm9jdXNlZEtleXdvcmRzLCBjb25kaXRpb24sIGRpc3BhdGNofSA9IHRoaXMucHJvcHNcblxuICAgIGxldCBib2R5RWwgPSAnJ1xuICAgIGlmIChmb2N1c2VkUXVlcmllcy5sZW5ndGggPiAwKSB7XG4gICAgICBib2R5RWwgPSAoXG4gICAgICAgIDxRdWVyeVZpZXcgLz5cbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKGZvY3VzZWRLZXl3b3Jkcy5sZW5ndGggPiAwKSB7XG4gICAgICBib2R5RWwgPSAoXG4gICAgICAgIDxLZXl3b3JkVmlldyAvPlxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICBib2R5RWwgPSAoXG4gICAgICAgIDxDb2xsZWN0aW9uVmlldyAvPlxuICAgICAgKVxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLkFwcH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuQXBwU2lkZWJhcn0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5BcHBTaWRlYmFyX190aXRsZX0+XG4gICAgICAgICAgICA8VGl0bGUgdGl0bGU9XCJEZXNpZ24gVGFza1wiIC8+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLkFwcFNpZGViYXJfX2hlYWRlcn0+XG4gICAgICAgICAgICA8VGFza0Rlc2NyaXB0aW9uIC8+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7Y29uZGl0aW9uID09PSAnc3lzdGVtJ1xuICAgICAgICAgICAgPyA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLkFwcFNpZGViYXJfX3RpdGxlfT5cbiAgICAgICAgICAgICAgPEZsZXhcbiAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zPVwiY2VudGVyXCJcbiAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudD1cInNwYWNlLWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICA8VGl0bGUgdGl0bGU9XCJTZWFyY2hlc1wiIC8+XG4gICAgICAgICAgICAgICAge2ZvY3VzZWRRdWVyaWVzLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICAgID8gPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBkaXNwYXRjaChjbGVhckZvY3VzZWRRdWVyaWVzKCkpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5BcHBTaWRlYmFyX19jbGVhckZpbHRlcnN9PmNsZWFyIGFsbDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgOiAnJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgPC9GbGV4PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA6ICcnXG4gICAgICAgICAgfVxuXG4gICAgICAgICAge2NvbmRpdGlvbiA9PT0gJ3N5c3RlbSdcbiAgICAgICAgICAgID8gPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5BcHBTaWRlYmFyX19ib2R5fT5cbiAgICAgICAgICAgICAgPFF1ZXJ5TGlzdCAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA6ICcnXG4gICAgICAgICAgfVxuXG4gICAgICAgICAge2NvbmRpdGlvbiA9PT0gJ3N5c3RlbSdcbiAgICAgICAgICAgID8gPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5BcHBTaWRlYmFyX190aXRsZX0+XG4gICAgICAgICAgICAgIDxGbGV4XG4gICAgICAgICAgICAgICAgYWxpZ25JdGVtcz1cImNlbnRlclwiXG4gICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ9XCJzcGFjZS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgPFRpdGxlIHRpdGxlPVwiQ29tbW9uIEtleXdvcmRzXCIgLz5cbiAgICAgICAgICAgICAgICB7Zm9jdXNlZEtleXdvcmRzLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICAgID8gPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBkaXNwYXRjaChjbGVhckZvY3VzZWRLZXl3b3JkcygpKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuQXBwU2lkZWJhcl9fY2xlYXJGaWx0ZXJzfT5jbGVhciBhbGw8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDogJydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDwvRmxleD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgOiAnJ1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHtjb25kaXRpb24gPT09ICdzeXN0ZW0nXG4gICAgICAgICAgICA/IDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuQXBwU2lkZWJhcl9fYm9keX0+XG4gICAgICAgICAgICAgIDxLZXl3b3JkTGlzdCAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA6ICcnXG4gICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLkFwcF9fbWFpbn0+XG4gICAgICAgICAge2JvZHlFbH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcbiAgc3RhdGUgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBzZXNzaW9uSWQ6IHN0YXRlLnN0dWR5LnNlc3Npb25JZCxcbiAgICAgIHRhc2tBbGlhczogc3RhdGUuc3R1ZHkudGFza0FsaWFzLFxuICAgICAgY29uZGl0aW9uOiBzdGF0ZS5zdHVkeS5jb25kaXRpb24sXG4gICAgICBmb2N1c2VkUXVlcmllczogc3RhdGUudWkuZm9jdXNlZFF1ZXJpZXMsXG4gICAgICBmb2N1c2VkS2V5d29yZHM6IHN0YXRlLnVpLmZvY3VzZWRLZXl3b3Jkc1xuICAgIH1cbiAgfVxuKShBcHApXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvY29tcG9uZW50cy9BcHAvQXBwLmpzeFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcIkFwcFwiOlwiQXBwX19BcHBfX19sQkVYSVwiLFwiQXBwX19tYWluXCI6XCJBcHBfX0FwcF9fbWFpbl9fXzJWWmppXCIsXCJBcHBTaWRlYmFyXCI6XCJBcHBfX0FwcFNpZGViYXJfX193WHZGNFwiLFwiQXBwU2lkZWJhcl9faGVhZGVyXCI6XCJBcHBfX0FwcFNpZGViYXJfX2hlYWRlcl9fXzJXdHFDXCIsXCJBcHBTaWRlYmFyX19ib2R5XCI6XCJBcHBfX0FwcFNpZGViYXJfX2JvZHlfX19aZHlWX1wiLFwiQXBwU2lkZWJhcl9fdGl0bGVcIjpcIkFwcF9fQXBwU2lkZWJhcl9fdGl0bGVfX18xMmhTQlwiLFwiQXBwU2lkZWJhcl9fY2xlYXJGaWx0ZXJzXCI6XCJBcHBfX0FwcFNpZGViYXJfX2NsZWFyRmlsdGVyc19fX1pETklYXCJ9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9BcHAvQXBwLmNzc1xuICoqIG1vZHVsZSBpZCA9IDQ5NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL1Rhc2tEZXNjcmlwdGlvbi5jc3MnXG5cbmNvbnN0IFRhc2tEZXNjcmlwdGlvbiA9ICh7XG4gIHRhc2ssXG4gIGZvY3VzZWRRdWVyaWVzXG59KSA9PiB7XG4gIGNvbnN0IHF1ZXJ5VGFza3MgPSBmb2N1c2VkUXVlcmllcy5tYXAoKHEsIGkpID0+IHtcbiAgICBsZXQgbWF0Y2hlZFRhc2sgPSBxLm1hdGNoZWRUYXNrXG5cbiAgICBpZiAobWF0Y2hlZFRhc2spIHtcbiAgICAgIHdoaWxlIChtYXRjaGVkVGFzay5pbmRleE9mKCc8ZW0+JykgIT09IC0xKSB7XG4gICAgICAgIGNvbnN0IGluc2VydFBvc2l0aW9uID0gbWF0Y2hlZFRhc2suaW5kZXhPZignPGVtPicpICsgM1xuICAgICAgICBjb25zdCBxdWVyeUNvbG9yID0gYHJnYmEoJHtxLmNvbG9yLnNsaWNlKDQsIHEuY29sb3IubGVuZ3RoIC0gMSl9LCAwLjMpYFxuICAgICAgICBtYXRjaGVkVGFzayA9IGAke21hdGNoZWRUYXNrLnNsaWNlKDAsIGluc2VydFBvc2l0aW9uKX0gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAke3F1ZXJ5Q29sb3J9O1wiICR7bWF0Y2hlZFRhc2suc2xpY2UoaW5zZXJ0UG9zaXRpb24pfWBcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5UYXNrRGVzY3JpcHRpb25fX3F1ZXJ5fVxuICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7X19odG1sOiBtYXRjaGVkVGFza319IC8+XG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJ1xuICAgIH1cbiAgfSlcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuVGFza0Rlc2NyaXB0aW9ufT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuVGFza0Rlc2NyaXB0aW9uX19tYWlufT5cbiAgICAgICAge3Rhc2sudGV4dH1cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7cXVlcnlUYXNrc31cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxuICBzdGF0ZSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRhc2s6IHN0YXRlLmRhdGEudGFzayB8fCB7fSxcbiAgICAgIGZvY3VzZWRRdWVyaWVzOiBzdGF0ZS5kYXRhLnF1ZXJpZXMuZmlsdGVyKHEgPT4gc3RhdGUudWkuZm9jdXNlZFF1ZXJpZXMuaW5kZXhPZihxLnF1ZXJ5KSAhPT0gLTEpXG4gICAgfVxuICB9XG4pKFRhc2tEZXNjcmlwdGlvbilcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jb21wb25lbnRzL1Rhc2tEZXNjcmlwdGlvbi9UYXNrRGVzY3JpcHRpb24uanN4XG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiVGFza0Rlc2NyaXB0aW9uXCI6XCJUYXNrRGVzY3JpcHRpb25fX1Rhc2tEZXNjcmlwdGlvbl9fXzF0T0s5XCIsXCJUYXNrRGVzY3JpcHRpb25fX21haW5cIjpcIlRhc2tEZXNjcmlwdGlvbl9fVGFza0Rlc2NyaXB0aW9uX19tYWluX19fTTNOSU5cIixcIlRhc2tEZXNjcmlwdGlvbl9fcXVlcnlcIjpcIlRhc2tEZXNjcmlwdGlvbl9fVGFza0Rlc2NyaXB0aW9uX19xdWVyeV9fXzFoMnFPXCJ9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9UYXNrRGVzY3JpcHRpb24vVGFza0Rlc2NyaXB0aW9uLmNzc1xuICoqIG1vZHVsZSBpZCA9IDQ5N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL1F1ZXJ5TGlzdC5jc3MnXG5pbXBvcnQgUXVlcnkgZnJvbSAnLi4vUXVlcnknXG5cbmNsYXNzIFF1ZXJ5TGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3Qge3F1ZXJpZXN9ID0gdGhpcy5wcm9wc1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuUXVlcnlMaXN0fT5cbiAgICAgICAge3F1ZXJpZXMubWFwKChxLCBpbmRleCkgPT5cbiAgICAgICAgICA8UXVlcnlcbiAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICBxdWVyeT17cX0gLz5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxuICBzdGF0ZSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHF1ZXJpZXM6IFsuLi5zdGF0ZS5kYXRhLnF1ZXJpZXNdLnNvcnQoKGEsIGIpID0+IGIuZXhhbXBsZXNDb3VudCAtIGEuZXhhbXBsZXNDb3VudClcbiAgICB9XG4gIH1cbikoUXVlcnlMaXN0KVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2NvbXBvbmVudHMvUXVlcnlMaXN0L1F1ZXJ5TGlzdC5qc3hcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJRdWVyeUxpc3RcIjpcIlF1ZXJ5TGlzdF9fUXVlcnlMaXN0X19fMkhjZ0xcIn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL1F1ZXJ5TGlzdC9RdWVyeUxpc3QuY3NzXG4gKiogbW9kdWxlIGlkID0gNDk5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4J1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vUXVlcnkuY3NzJ1xuXG5pbXBvcnQge3RvZ2dsZUZvY3VzUXVlcnl9IGZyb20gJy4uLy4uL3N0b3JlL3VpQWN0aW9ucydcblxuY29uc3QgUXVlcnkgPSAoe1xuICBxdWVyeSxcbiAgZm9jdXNlZFF1ZXJpZXMsXG4gIHRvZ2dsZUZvY3VzXG59KSA9PiB7XG4gIGxldCBzdHlsZSA9IHt9XG4gIGxldCBjbGFzc05hbWVzID0gW3N0eWxlcy5RdWVyeV1cbiAgaWYgKGZvY3VzZWRRdWVyaWVzLmluZGV4T2YocXVlcnkucXVlcnkpICE9PSAtMSkge1xuICAgIHN0eWxlLmJhY2tncm91bmRDb2xvciA9IGByZ2JhKCR7cXVlcnkuY29sb3Iuc2xpY2UoNCwgcXVlcnkuY29sb3IubGVuZ3RoIC0gMSl9LCAwLjMpYFxuICAgIGNsYXNzTmFtZXMucHVzaChzdHlsZXMuUXVlcnlfaXNGb2N1c2VkKVxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBvbkNsaWNrPXt0b2dnbGVGb2N1c31cbiAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5qb2luKCcgJyl9PlxuICAgICAge3F1ZXJ5LnF1ZXJ5fSAoe3F1ZXJ5LmV4YW1wbGVzQ291bnR9KVxuICAgIDwvZGl2PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXG4gIHN0YXRlID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgZm9jdXNlZFF1ZXJpZXM6IHN0YXRlLnVpLmZvY3VzZWRRdWVyaWVzXG4gICAgfVxuICB9LFxuICAoZGlzcGF0Y2gsIG93blByb3BzKSA9PiB7XG4gICAgY29uc3Qge3F1ZXJ5OiB7cXVlcnl9fSA9IG93blByb3BzXG5cbiAgICByZXR1cm4ge1xuICAgICAgdG9nZ2xlRm9jdXM6ICgpID0+IHtcbiAgICAgICAgZGlzcGF0Y2godG9nZ2xlRm9jdXNRdWVyeShxdWVyeSkpXG4gICAgICB9XG4gICAgfVxuICB9XG4pKFF1ZXJ5KVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2NvbXBvbmVudHMvUXVlcnkvUXVlcnkuanN4XG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiUXVlcnlcIjpcIlF1ZXJ5X19RdWVyeV9fXzMyeVZQXCIsXCJRdWVyeV9pc0ZvY3VzZWRcIjpcIlF1ZXJ5X19RdWVyeV9pc0ZvY3VzZWRfX18zWXU2WlwifTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvUXVlcnkvUXVlcnkuY3NzXG4gKiogbW9kdWxlIGlkID0gNTAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnQgY29uc3QgVE9HR0xFX0hJR0hMSUdIVF9RVUVSWSA9ICdUT0dHTEVfSElHSExJR0hUX1FVRVJZJ1xuZXhwb3J0IGNvbnN0IFRPR0dMRV9GT0NVU19RVUVSWSA9ICdUT0dHTEVfRk9DVVNfUVVFUlknXG5leHBvcnQgY29uc3QgVE9HR0xFX0ZPQ1VTX0tFWVdPUkQgPSAnVE9HR0xFX0ZPQ1VTX0tFWVdPUkQnXG5leHBvcnQgY29uc3QgQ0xFQVJfRk9DVVNFRF9RVUVSSUVTID0gJ0NMRUFSX0ZPQ1VTRURfUVVFUklFUydcbmV4cG9ydCBjb25zdCBDTEVBUl9GT0NVU0VEX0tFWVdPUkRTID0gJ0NMRUFSX0ZPQ1VTRURfS0VZV09SRFMnXG5cbmV4cG9ydCBjb25zdCB0b2dnbGVIaWdobGlnaHRRdWVyeSA9IChxdWVyeSkgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IFRPR0dMRV9ISUdITElHSFRfUVVFUlksXG4gICAgcXVlcnlcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgdG9nZ2xlRm9jdXNRdWVyeSA9IChxdWVyeSkgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IFRPR0dMRV9GT0NVU19RVUVSWSxcbiAgICBxdWVyeVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCB0b2dnbGVGb2N1c0tleXdvcmQgPSAoa2V5d29yZCkgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IFRPR0dMRV9GT0NVU19LRVlXT1JELFxuICAgIGtleXdvcmRcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgY2xlYXJGb2N1c2VkUXVlcmllcyA9ICgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBDTEVBUl9GT0NVU0VEX1FVRVJJRVNcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgY2xlYXJGb2N1c2VkS2V5d29yZHMgPSAoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQ0xFQVJfRk9DVVNFRF9LRVlXT1JEU1xuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvc3RvcmUvdWlBY3Rpb25zLmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL0tleXdvcmRMaXN0LmNzcydcbmltcG9ydCBLZXl3b3JkIGZyb20gJy4uL0tleXdvcmQnXG5cbmNsYXNzIEtleXdvcmRMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7a2V5d29yZHN9ID0gdGhpcy5wcm9wc1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuS2V5d29yZExpc3R9PlxuICAgICAgICB7a2V5d29yZHMubWFwKChrLCBpbmRleCkgPT5cbiAgICAgICAgICA8S2V5d29yZFxuICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgIGtleXdvcmQ9e2t9IC8+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcbiAgc3RhdGUgPT4ge1xuICAgIGNvbnN0IHF1ZXJpZXMgPSBzdGF0ZS51aS5mb2N1c2VkUXVlcmllcy5sZW5ndGhcbiAgICAgID8gc3RhdGUudWkuZm9jdXNlZFF1ZXJpZXNcbiAgICAgIDogc3RhdGUuZGF0YS5xdWVyaWVzLm1hcChxID0+IHEucXVlcnkpXG4gICAgY29uc3QgZXhhbXBsZXMgPSBzdGF0ZS5kYXRhLmV4YW1wbGVzLmZpbHRlcihlID0+IHF1ZXJpZXMuaW5kZXhPZihlLnF1ZXJ5KSAhPT0gLTEpXG4gICAgY29uc3Qgc3RlbXMgPSBleGFtcGxlcy5yZWR1Y2UoKGNhcnJ5LCBjdXJyZW50KSA9PiBbLi4uY2FycnksIC4uLmN1cnJlbnQuaW1hZ2VEZXNjcmlwdGlvblN0ZW1zXSwgW10pXG4gICAgY29uc3Qgc3RlbURpY3Rpb25hcnkgPSBleGFtcGxlcy5yZWR1Y2UoKGNhcnJ5LCBjdXJyZW50KSA9PiBPYmplY3QuYXNzaWduKHt9LCBjYXJyeSwgY3VycmVudC5zdGVtRGljdGlvbmFyeSksIHt9KVxuXG4gICAgY29uc3Qga2V5d29yZHMgPSBbXVxuICAgIGNvbnN0IHN0ZW1JbmRleE1hcCA9IHt9XG5cbiAgICBmb3IgKGxldCBzdGVtIG9mIHN0ZW1zKSB7XG4gICAgICBjb25zdCBzdGVtSW5kZXggPSBzdGVtSW5kZXhNYXBbc3RlbV1cbiAgICAgIGlmIChzdGVtSW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBrZXl3b3Jkc1tzdGVtSW5kZXhdLmZyZXF1ZW5jeSArPSAxXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGVtSW5kZXhNYXBbc3RlbV0gPSBrZXl3b3Jkcy5sZW5ndGhcbiAgICAgICAga2V5d29yZHMucHVzaCh7XG4gICAgICAgICAgZnJlcXVlbmN5OiAxLFxuICAgICAgICAgIGtleXdvcmQ6IHN0ZW1EaWN0aW9uYXJ5W3N0ZW1dLFxuICAgICAgICAgIHN0ZW1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhrZXl3b3JkcylcblxuICAgIHJldHVybiB7XG4gICAgICBrZXl3b3Jkczoga2V5d29yZHMuc29ydCgoYSwgYikgPT4gYi5mcmVxdWVuY3kgLSBhLmZyZXF1ZW5jeSlcbiAgICB9XG4gIH1cbikoS2V5d29yZExpc3QpXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvY29tcG9uZW50cy9LZXl3b3JkTGlzdC9LZXl3b3JkTGlzdC5qc3hcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJLZXl3b3JkTGlzdFwiOlwiS2V5d29yZExpc3RfX0tleXdvcmRMaXN0X19fRTZnbzdcIn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL0tleXdvcmRMaXN0L0tleXdvcmRMaXN0LmNzc1xuICoqIG1vZHVsZSBpZCA9IDUwNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL0tleXdvcmQuY3NzJ1xuXG5pbXBvcnQge3RvZ2dsZUZvY3VzS2V5d29yZH0gZnJvbSAnLi4vLi4vc3RvcmUvdWlBY3Rpb25zJ1xuXG5jb25zdCBLZXl3b3JkID0gKHtcbiAga2V5d29yZCxcbiAgZm9jdXNlZEtleXdvcmRzLFxuICB0b2dnbGVGb2N1c1xufSkgPT4ge1xuICBsZXQgY2xhc3NOYW1lcyA9IFtzdHlsZXMuS2V5d29yZF1cbiAgaWYgKGZvY3VzZWRLZXl3b3Jkcy5pbmRleE9mKGtleXdvcmQua2V5d29yZCkgIT09IC0xKSB7XG4gICAgY2xhc3NOYW1lcy5wdXNoKHN0eWxlcy5LZXl3b3JkX2lzRm9jdXNlZClcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgb25DbGljaz17dG9nZ2xlRm9jdXN9XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMuam9pbignICcpfT5cbiAgICAgIHtrZXl3b3JkLmtleXdvcmR9ICh7a2V5d29yZC5mcmVxdWVuY3l9KVxuICAgIDwvZGl2PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXG4gIHN0YXRlID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgZm9jdXNlZEtleXdvcmRzOiBzdGF0ZS51aS5mb2N1c2VkS2V5d29yZHNcbiAgICB9XG4gIH0sXG4gIChkaXNwYXRjaCwgb3duUHJvcHMpID0+IHtcbiAgICBjb25zdCB7a2V5d29yZDoge2tleXdvcmR9fSA9IG93blByb3BzXG5cbiAgICByZXR1cm4ge1xuICAgICAgdG9nZ2xlRm9jdXM6ICgpID0+IHtcbiAgICAgICAgZGlzcGF0Y2godG9nZ2xlRm9jdXNLZXl3b3JkKGtleXdvcmQpKVxuICAgICAgfVxuICAgIH1cbiAgfVxuKShLZXl3b3JkKVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2NvbXBvbmVudHMvS2V5d29yZC9LZXl3b3JkLmpzeFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcIktleXdvcmRcIjpcIktleXdvcmRfX0tleXdvcmRfX18yRWtTWVwiLFwiS2V5d29yZF9pc0ZvY3VzZWRcIjpcIktleXdvcmRfX0tleXdvcmRfaXNGb2N1c2VkX19fdzBNUlNcIn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL0tleXdvcmQvS2V5d29yZC5jc3NcbiAqKiBtb2R1bGUgaWQgPSA1MDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnXG5cbmltcG9ydCBFeGFtcGxlTGlzdCBmcm9tICcuLi9FeGFtcGxlTGlzdCdcblxuY29uc3QgQ29sbGVjdGlvblZpZXcgPSAoe1xuICBleGFtcGxlc1xufSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxFeGFtcGxlTGlzdFxuICAgICAgbkNvbHM9ezV9XG4gICAgICBleGFtcGxlcz17ZXhhbXBsZXN9IC8+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcbiAgc3RhdGUgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBleGFtcGxlczogWy4uLnN0YXRlLmRhdGEuZXhhbXBsZXNdLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgaWYgKGIuY3JlYXRlZEF0ID4gYS5jcmVhdGVkQXQpIHtcbiAgICAgICAgICByZXR1cm4gLTFcbiAgICAgICAgfSBlbHNlIGlmIChhLmNyZWF0ZWRBdCA+PSBiLmNyZWF0ZWRBdCkge1xuICAgICAgICAgIHJldHVybiAxXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG4pKENvbGxlY3Rpb25WaWV3KVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2NvbXBvbmVudHMvQ29sbGVjdGlvblZpZXcvQ29sbGVjdGlvblZpZXcuanN4XG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vRXhhbXBsZUxpc3QuY3NzJ1xuaW1wb3J0IEV4YW1wbGUgZnJvbSAnLi4vRXhhbXBsZSdcblxuY2xhc3MgRXhhbXBsZUxpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHtleGFtcGxlcywgbkNvbHN9ID0gdGhpcy5wcm9wc1xuICAgIGNvbnN0IGNvbHVtbnMgPSBbXVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuQ29sczsgaSsrKSB7XG4gICAgICBjb25zdCBjb2x1bW4gPSBleGFtcGxlcy5maWx0ZXIoKGUsIGluZGV4KSA9PiB7XG4gICAgICAgIHJldHVybiBpbmRleCAlIG5Db2xzID09PSBpXG4gICAgICB9KVxuXG4gICAgICBjb2x1bW5zLnB1c2goY29sdW1uKVxuICAgIH1cblxuICAgIGxldCBjbGFzc05hbWVzID0gW3N0eWxlcy5FeGFtcGxlTGlzdF1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5qb2luKCcgJyl9PlxuICAgICAgICB7Y29sdW1ucy5tYXAoKGNvbHVtbiwgaSkgPT5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5FeGFtcGxlTGlzdF9fY29sdW1ufT5cbiAgICAgICAgICAgIHtjb2x1bW4ubWFwKChleGFtcGxlLCBqKSA9PlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAga2V5PXtqfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLkV4YW1wbGVMaXN0X19leGFtcGxlfT5cbiAgICAgICAgICAgICAgICA8RXhhbXBsZVxuICAgICAgICAgICAgICAgICAgY29tcGFjdD17bkNvbHMgPiA1fVxuICAgICAgICAgICAgICAgICAgZXhhbXBsZT17ZXhhbXBsZX0gLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfTwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEV4YW1wbGVMaXN0XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvY29tcG9uZW50cy9FeGFtcGxlTGlzdC9FeGFtcGxlTGlzdC5qc3hcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJFeGFtcGxlTGlzdFwiOlwiRXhhbXBsZUxpc3RfX0V4YW1wbGVMaXN0X19fNzRKYzNcIixcIkV4YW1wbGVMaXN0X19jb2x1bW5cIjpcIkV4YW1wbGVMaXN0X19FeGFtcGxlTGlzdF9fY29sdW1uX19fM0Z6a1dcIixcIkV4YW1wbGVMaXN0X19leGFtcGxlXCI6XCJFeGFtcGxlTGlzdF9fRXhhbXBsZUxpc3RfX2V4YW1wbGVfX18zZWpMX1wifTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvRXhhbXBsZUxpc3QvRXhhbXBsZUxpc3QuY3NzXG4gKiogbW9kdWxlIGlkID0gNTA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4J1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vRXhhbXBsZS5jc3MnXG5pbXBvcnQge3RvZ2dsZUhpZ2hsaWdodFF1ZXJ5fSBmcm9tICcuLi8uLi9zdG9yZS91aUFjdGlvbnMnXG5cbmNvbnN0IEV4YW1wbGUgPSAoe1xuICBleGFtcGxlLFxuICBjb21wYWN0LFxuICBjb2xvcixcbiAgZm9jdXNlZFF1ZXJpZXMsXG4gIGhpZ2hsaWdodGVkUXVlcnksXG4gIGhpZ2hsaWdodFF1ZXJ5XG59KSA9PiB7XG4gIGxldCBzdHlsZSA9IHt9XG4gIGxldCBjbGFzc05hbWVzID0gW3N0eWxlcy5FeGFtcGxlXVxuICBpZiAoY29tcGFjdCkge1xuICAgIGNsYXNzTmFtZXMucHVzaChzdHlsZXMuRXhhbXBsZV9jb21wYWN0KVxuICB9XG4gIGlmIChmb2N1c2VkUXVlcmllcy5sZW5ndGggPiAxICYmIGhpZ2hsaWdodGVkUXVlcnkgPT09IGV4YW1wbGUucXVlcnkpIHtcbiAgICBzdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgcmdiYSgke2NvbG9yLnNsaWNlKDQsIGNvbG9yLmxlbmd0aCAtIDEpfSwgMC4zKWBcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgb25Nb3VzZUVudGVyPXtoaWdobGlnaHRRdWVyeX1cbiAgICAgIG9uTW91c2VMZWF2ZT17aGlnaGxpZ2h0UXVlcnl9XG4gICAgICBzdHlsZT17c3R5bGV9XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMuam9pbignICcpfT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuRXhhbXBsZV9faW1hZ2VXcmFwcGVyfT5cbiAgICAgICAgPGltZ1xuICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLkV4YW1wbGVfX2ltYWdlfVxuICAgICAgICAgIHNyYz17ZXhhbXBsZS5leGFtcGxlLnNyY30gLz5cbiAgICAgIDwvZGl2PlxuICAgICAgXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLkV4YW1wbGVfX2Rlc2NyaXB0aW9ufT5cbiAgICAgICAge2V4YW1wbGUuaW1hZ2VEZXNjcmlwdGlvbn1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXG4gIChzdGF0ZSwgb3duUHJvcHMpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgZm9jdXNlZFF1ZXJpZXM6IHN0YXRlLnVpLmZvY3VzZWRRdWVyaWVzLFxuICAgICAgaGlnaGxpZ2h0ZWRRdWVyeTogc3RhdGUudWkuaGlnaGxpZ2h0ZWRRdWVyeSxcbiAgICAgIGNvbG9yOiBzdGF0ZS5kYXRhLnF1ZXJpZXMuZmlsdGVyKHEgPT4gcS5xdWVyeSA9PT0gb3duUHJvcHMuZXhhbXBsZS5xdWVyeSlbMF0uY29sb3JcbiAgICB9XG4gIH0sXG4gIChkaXNwYXRjaCwgb3duUHJvcHMpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgaGlnaGxpZ2h0UXVlcnk6ICgpID0+IHtcbiAgICAgICAgY29uc3Qge3F1ZXJ5fSA9IG93blByb3BzLmV4YW1wbGVcblxuICAgICAgICBkaXNwYXRjaCh0b2dnbGVIaWdobGlnaHRRdWVyeShxdWVyeSkpXG4gICAgICB9XG4gICAgfVxuICB9XG4pKEV4YW1wbGUpXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvY29tcG9uZW50cy9FeGFtcGxlL0V4YW1wbGUuanN4XG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiRXhhbXBsZVwiOlwiRXhhbXBsZV9fRXhhbXBsZV9fXzI3UzBpXCIsXCJFeGFtcGxlX19pbWFnZVdyYXBwZXJcIjpcIkV4YW1wbGVfX0V4YW1wbGVfX2ltYWdlV3JhcHBlcl9fXzFMLXo1XCIsXCJFeGFtcGxlX19pbWFnZVwiOlwiRXhhbXBsZV9fRXhhbXBsZV9faW1hZ2VfX18zWWQ2MVwiLFwiRXhhbXBsZV9fZGVzY3JpcHRpb25cIjpcIkV4YW1wbGVfX0V4YW1wbGVfX2Rlc2NyaXB0aW9uX19fMVJXaHJcIixcIkV4YW1wbGVfY29tcGFjdFwiOlwiRXhhbXBsZV9fRXhhbXBsZV9jb21wYWN0X19fMmtZZkpcIn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL0V4YW1wbGUvRXhhbXBsZS5jc3NcbiAqKiBtb2R1bGUgaWQgPSA1MTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnXG5cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9LZXl3b3JkVmlldy5jc3MnXG5pbXBvcnQgRXhhbXBsZUxpc3QgZnJvbSAnLi4vRXhhbXBsZUxpc3QnXG5pbXBvcnQgS2V5d29yZEV4YW1wbGVMaXN0IGZyb20gJy4uL0tleXdvcmRFeGFtcGxlTGlzdCdcblxuY29uc3QgS2V5d29yZFZpZXcgPSAoe1xuICBmb2N1c2VkS2V5d29yZHMsXG4gIGV4YW1wbGVzXG59KSA9PiB7XG4gIGNvbnN0IGZvY3VzZWRLZXl3b3Jkc1JlZ2V4cCA9IG5ldyBSZWdFeHAoYCgke2ZvY3VzZWRLZXl3b3Jkcy5qb2luKCd8Jyl9KWApXG4gIGNvbnN0IG5vbktleXdvcmRFeGFtcGxlcyA9IGV4YW1wbGVzLmZpbHRlcihlID0+ICFmb2N1c2VkS2V5d29yZHNSZWdleHAudGVzdChlLmltYWdlRGVzY3JpcHRpb24pKVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5LZXl3b3JkVmlld30+XG4gICAgICB7Zm9jdXNlZEtleXdvcmRzLm1hcCgoaywgaW5kZXgpID0+XG4gICAgICAgIDxLZXl3b3JkRXhhbXBsZUxpc3RcbiAgICAgICAgICBrZXl3b3JkPXtrfVxuICAgICAgICAgIGV4YW1wbGVzPXtleGFtcGxlc30gLz5cbiAgICAgICl9XG5cbiAgICAgIDxFeGFtcGxlTGlzdFxuICAgICAgICBuQ29scz17OH1cbiAgICAgICAgZXhhbXBsZXM9e25vbktleXdvcmRFeGFtcGxlc30gLz5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxuICBzdGF0ZSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGV4YW1wbGVzOiBzdGF0ZS5kYXRhLmV4YW1wbGVzLFxuICAgICAgZm9jdXNlZEtleXdvcmRzOiBzdGF0ZS51aS5mb2N1c2VkS2V5d29yZHNcbiAgICB9XG4gIH1cbikoS2V5d29yZFZpZXcpXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvY29tcG9uZW50cy9LZXl3b3JkVmlldy9LZXl3b3JkVmlldy5qc3hcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJLZXl3b3JkVmlld1wiOlwiS2V5d29yZFZpZXdfX0tleXdvcmRWaWV3X19fMjNPSUVcIn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL0tleXdvcmRWaWV3L0tleXdvcmRWaWV3LmNzc1xuICoqIG1vZHVsZSBpZCA9IDUxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vS2V5d29yZEV4YW1wbGVMaXN0LmNzcydcbmltcG9ydCBFeGFtcGxlTGlzdCBmcm9tICcuLi9FeGFtcGxlTGlzdCdcbmltcG9ydCBCbG9jayBmcm9tICcuLi8uLi9sYXlvdXRzL0Jsb2NrJ1xuXG5jb25zdCBLZXl3b3JkRXhhbXBsZUxpc3QgPSAoe1xuICBrZXl3b3JkLFxuICBleGFtcGxlc1xufSkgPT4ge1xuICBjb25zdCBmaWx0ZXJlZEV4YW1wbGVzID0gZXhhbXBsZXMuZmlsdGVyKGUgPT4gZS5pbWFnZURlc2NyaXB0aW9uLmluZGV4T2Yoa2V5d29yZCkgIT09IC0xKVxuXG4gIGlmIChmaWx0ZXJlZEV4YW1wbGVzLmxlbmd0aCkge1xuICAgIHJldHVybiAoXG4gICAgICA8QmxvY2s+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBrZXk9e2tleXdvcmR9XG4gICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuS2V5d29yZEV4YW1wbGVMaXN0fT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLktleXdvcmRFeGFtcGxlTGlzdF9fa2V5d29yZH0+e2tleXdvcmR9PC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLktleXdvcmRFeGFtcGxlTGlzdF9fZXhhbXBsZXN9PlxuICAgICAgICAgICAgPEV4YW1wbGVMaXN0XG4gICAgICAgICAgICAgIG5Db2xzPXs3fVxuICAgICAgICAgICAgICBleGFtcGxlcz17ZmlsdGVyZWRFeGFtcGxlc30gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L0Jsb2NrPlxuICAgIClcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gKFxuICAgICAgPHNwYW4+PC9zcGFuPlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBLZXl3b3JkRXhhbXBsZUxpc3RcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jb21wb25lbnRzL0tleXdvcmRFeGFtcGxlTGlzdC9LZXl3b3JkRXhhbXBsZUxpc3QuanN4XG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiS2V5d29yZEV4YW1wbGVMaXN0XCI6XCJLZXl3b3JkRXhhbXBsZUxpc3RfX0tleXdvcmRFeGFtcGxlTGlzdF9fXzFFXzExXCIsXCJLZXl3b3JkRXhhbXBsZUxpc3RfX2tleXdvcmRcIjpcIktleXdvcmRFeGFtcGxlTGlzdF9fS2V5d29yZEV4YW1wbGVMaXN0X19rZXl3b3JkX19fM212N05cIixcIktleXdvcmRFeGFtcGxlTGlzdF9fZXhhbXBsZXNcIjpcIktleXdvcmRFeGFtcGxlTGlzdF9fS2V5d29yZEV4YW1wbGVMaXN0X19leGFtcGxlc19fXzJRYmZxXCJ9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9LZXl3b3JkRXhhbXBsZUxpc3QvS2V5d29yZEV4YW1wbGVMaXN0LmNzc1xuICoqIG1vZHVsZSBpZCA9IDUxNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5jb25zdCBiYXNlbGluZSA9IDAuNzUwXG5cbmNvbnN0IEJsb2NrID0gKHtcbiAgbiA9IDEsXG4gIGV4dHJhQ2xhc3NOYW1lcyA9ICcnLFxuICBjaGlsZHJlblxufSkgPT4ge1xuICBjb25zdCBzdHlsZSA9IHtcbiAgICBtYXJnaW5Cb3R0b206IGAke2Jhc2VsaW5lICogbn1yZW1gXG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3N0eWxlfSBjbGFzc05hbWU9e2V4dHJhQ2xhc3NOYW1lc30+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgQmxvY2tcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9sYXlvdXRzL0Jsb2NrL0Jsb2NrLmpzeFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnXG5cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9RdWVyeVZpZXcuY3NzJ1xuaW1wb3J0IEV4YW1wbGVMaXN0IGZyb20gJy4uL0V4YW1wbGVMaXN0J1xuaW1wb3J0IEtleXdvcmRFeGFtcGxlTGlzdCBmcm9tICcuLi9LZXl3b3JkRXhhbXBsZUxpc3QnXG5pbXBvcnQgQmxvY2sgZnJvbSAnLi4vLi4vbGF5b3V0cy9CbG9jaydcbmltcG9ydCBUaXRsZSBmcm9tICcuLi9UaXRsZSdcblxuY29uc3QgUXVlcnlWaWV3ID0gKHtcbiAgZGlyZWN0RXhhbXBsZXMsXG4gIHJlbGF0ZWRFeGFtcGxlcyxcbiAgZm9jdXNlZEtleXdvcmRzXG59KSA9PiB7XG4gIGNvbnN0IGZvY3VzZWRLZXl3b3Jkc1JlZ2V4cCA9IG5ldyBSZWdFeHAoYCgke2ZvY3VzZWRLZXl3b3Jkcy5qb2luKCd8Jyl9KWApXG5cbiAgY29uc3Qgbm9uS2V5d29yZERpcmVjdEV4YW1wbGVzID0gZGlyZWN0RXhhbXBsZXMuZmlsdGVyKGUgPT4gIWZvY3VzZWRLZXl3b3Jkcy5sZW5ndGggfHwgIWZvY3VzZWRLZXl3b3Jkc1JlZ2V4cC50ZXN0KGUuaW1hZ2VEZXNjcmlwdGlvbikpXG4gIGxldCBkaXJlY3RFeGFtcGxlc0VsID0gJydcbiAgaWYgKG5vbktleXdvcmREaXJlY3RFeGFtcGxlcy5sZW5ndGgpIHtcbiAgICBkaXJlY3RFeGFtcGxlc0VsID0gKFxuICAgICAgPEV4YW1wbGVMaXN0XG4gICAgICAgIG5Db2xzPXs4fVxuICAgICAgICBleGFtcGxlcz17bm9uS2V5d29yZERpcmVjdEV4YW1wbGVzfSAvPlxuICAgIClcbiAgfVxuXG4gIGNvbnN0IG5vbktleXdvcmRSZWxhdGVkRXhhbXBsZXMgPSByZWxhdGVkRXhhbXBsZXMuZmlsdGVyKGUgPT4gIWZvY3VzZWRLZXl3b3Jkcy5sZW5ndGggfHwgIWZvY3VzZWRLZXl3b3Jkc1JlZ2V4cC50ZXN0KGUuaW1hZ2VEZXNjcmlwdGlvbikpXG4gIGxldCByZWxhdGVkRXhhbXBsZXNFbCA9ICcnXG4gIGlmIChub25LZXl3b3JkRGlyZWN0RXhhbXBsZXMubGVuZ3RoKSB7XG4gICAgcmVsYXRlZEV4YW1wbGVzRWwgPSAoXG4gICAgICA8RXhhbXBsZUxpc3RcbiAgICAgICAgbkNvbHM9ezh9XG4gICAgICAgIGV4YW1wbGVzPXtub25LZXl3b3JkUmVsYXRlZEV4YW1wbGVzfSAvPlxuICAgIClcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5RdWVyeVZpZXd9PlxuICAgICAgPEJsb2NrPlxuICAgICAgICA8QmxvY2s+XG4gICAgICAgICAgPFRpdGxlIHRpdGxlPVwiQ29sZWN0ZWQgYnkgYnJvd3Npbmcgc2VhcmNoIHJlc3VsdHNcIiAvPlxuICAgICAgICA8L0Jsb2NrPlxuXG4gICAgICAgIHtmb2N1c2VkS2V5d29yZHMubWFwKChrLCBpbmRleCkgPT5cbiAgICAgICAgICA8S2V5d29yZEV4YW1wbGVMaXN0XG4gICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAga2V5d29yZD17a31cbiAgICAgICAgICAgIGV4YW1wbGVzPXtkaXJlY3RFeGFtcGxlc30gLz5cbiAgICAgICAgKX1cblxuICAgICAgICB7ZGlyZWN0RXhhbXBsZXNFbH1cbiAgICAgIDwvQmxvY2s+XG5cbiAgICAgIDxCbG9jaz5cbiAgICAgICAgPFRpdGxlIHRpdGxlPVwiQ29sZWN0ZWQgYnkgYnJvd3NpbmcgcmVsYXRlZCBpbWFnZXNcIiAvPlxuICAgICAgPC9CbG9jaz5cblxuICAgICAge2ZvY3VzZWRLZXl3b3Jkcy5tYXAoKGssIGluZGV4KSA9PlxuICAgICAgICA8S2V5d29yZEV4YW1wbGVMaXN0XG4gICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICBrZXl3b3JkPXtrfVxuICAgICAgICAgIGV4YW1wbGVzPXtyZWxhdGVkRXhhbXBsZXN9IC8+XG4gICAgICApfVxuXG4gICAgICB7cmVsYXRlZEV4YW1wbGVzRWx9XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcbiAgc3RhdGUgPT4ge1xuICAgIGNvbnN0IGV4YW1wbGVzID0gc3RhdGUuZGF0YS5leGFtcGxlcy5maWx0ZXIoZSA9PiB7XG4gICAgICByZXR1cm4gc3RhdGUudWkuZm9jdXNlZFF1ZXJpZXMuaW5kZXhPZihlLnF1ZXJ5KSAhPT0gLTFcbiAgICB9KVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGZvY3VzZWRLZXl3b3Jkczogc3RhdGUudWkuZm9jdXNlZEtleXdvcmRzLFxuICAgICAgZGlyZWN0RXhhbXBsZXM6IGV4YW1wbGVzXG4gICAgICAgIC5maWx0ZXIoZSA9PiBlLnJlbGV2YW5jZSA+IDApXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgaWYgKGEucXVlcnkgPiBiLnF1ZXJ5KSB7XG4gICAgICAgICAgICByZXR1cm4gMVxuICAgICAgICAgIH0gZWxzZSBpZiAoYS5xdWVyeSA8IGIucXVlcnkpIHtcbiAgICAgICAgICAgIHJldHVybiAtMVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoYS5jcmVhdGVkQXQgPiBiLmNyZWF0ZWRBdCkge1xuICAgICAgICAgICAgICByZXR1cm4gMVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIC0xXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgIHJlbGF0ZWRFeGFtcGxlczogZXhhbXBsZXNcbiAgICAgICAgLmZpbHRlcihlID0+IGUucmVsZXZhbmNlID09PSAtMSlcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICBpZiAoYS5xdWVyeSA+IGIucXVlcnkpIHtcbiAgICAgICAgICAgIHJldHVybiAxXG4gICAgICAgICAgfSBlbHNlIGlmIChhLnF1ZXJ5IDwgYi5xdWVyeSkge1xuICAgICAgICAgICAgcmV0dXJuIC0xXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChhLmNyZWF0ZWRBdCA+IGIuY3JlYXRlZEF0KSB7XG4gICAgICAgICAgICAgIHJldHVybiAxXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gLTFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuICB9XG4pKFF1ZXJ5VmlldylcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jb21wb25lbnRzL1F1ZXJ5Vmlldy9RdWVyeVZpZXcuanN4XG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiUXVlcnlWaWV3XCI6XCJRdWVyeVZpZXdfX1F1ZXJ5Vmlld19fXzNhb256XCJ9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9RdWVyeVZpZXcvUXVlcnlWaWV3LmNzc1xuICoqIG1vZHVsZSBpZCA9IDUxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vVGl0bGUuY3NzJ1xuXG5jb25zdCBUaXRsZSA9ICh7XG4gIHRpdGxlXG59KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5UaXRsZX0+XG4gICAgICB7dGl0bGV9XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgVGl0bGVcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jb21wb25lbnRzL1RpdGxlL1RpdGxlLmpzeFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcIlRpdGxlXCI6XCJUaXRsZV9fVGl0bGVfX18xN0J1S1wifTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvVGl0bGUvVGl0bGUuY3NzXG4gKiogbW9kdWxlIGlkID0gNTIwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgaW8gZnJvbSAnc29ja2V0LmlvLWNsaWVudCdcblxuY29uc3Qgc29ja2V0ID0gaW8oJ2h0dHBzOi8vdmR6aXViYWsuY29tLycsIHtwYXRoOiAnL2Rlc2lnbkZpeGF0aW9uU2VydmVyJ30pXG5cbmV4cG9ydCBkZWZhdWx0IHNvY2tldFxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL3N0b3JlL3NvY2tldC5qc1xuICoqLyIsImltcG9ydCByYW5kb21jb2xvciBmcm9tICdyYW5kb21jb2xvcidcbmltcG9ydCBhbGdvbGlhc2VhcmNoIGZyb20gJ2FsZ29saWFzZWFyY2gnXG5cbmNvbnN0IGNsaWVudCA9IGFsZ29saWFzZWFyY2goJzc0UzFKTkIxWlQnLCAnM2RlNmZkYmFmYzQ3N2NmMDE5NjczYmI4MTA0M2FlMGQnKVxuY29uc3QgaW5kZXggPSBjbGllbnQuaW5pdEluZGV4KCdEZXNpZ25GaXhhdGlvblN0dWR5VGFza3MnKVxuXG5leHBvcnQgY29uc3QgUkVDRUlWRV9EQVRBID0gJ1JFQ0VJVkVfREFUQSdcbmV4cG9ydCBjb25zdCBSRUNFSVZFX1FVRVJZX1RBU0sgPSAnUkVDRUlWRV9RVUVSWV9UQVNLJ1xuZXhwb3J0IGNvbnN0IFJFQ0VJVkVfRVhBTVBMRSA9ICdSRUNFSVZFX0VYQU1QTEUnXG5leHBvcnQgY29uc3QgUkVDRUlWRV9RVUVSWSA9ICdSRUNFSVZFX1FVRVJZJ1xuZXhwb3J0IGNvbnN0IElOQ19FWEFNUExFX0NPVU5URVIgPSAnSU5DX0VYQU1QTEVfQ09VTlRFUidcblxuZXhwb3J0IGNvbnN0IHJlY2VpdmVFeGFtcGxlID0gKGV4YW1wbGUpID0+IHtcbiAgcmV0dXJuIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBjb25zb2xlLmxvZyhleGFtcGxlKVxuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IElOQ19FWEFNUExFX0NPVU5URVIsXG4gICAgICBxdWVyeTogZXhhbXBsZS5xdWVyeVxuICAgIH0pXG5cbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBSRUNFSVZFX0VYQU1QTEUsXG4gICAgICBleGFtcGxlXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgcmVjZWl2ZVF1ZXJ5ID0gKHF1ZXJ5KSA9PiB7XG4gIHJldHVybiBkaXNwYXRjaCA9PiB7XG4gICAgY29uc29sZS5sb2cocXVlcnkpXG4gICAgY29uc3QgY29sb3IgPSByYW5kb21jb2xvcih7XG4gICAgICBsdW1pbm9zaXR5OiAnYnJpZ2h0JyxcbiAgICAgIGZvcm1hdDogJ3JnYidcbiAgICB9KVxuXG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogUkVDRUlWRV9RVUVSWSxcbiAgICAgIHF1ZXJ5OiBPYmplY3QuYXNzaWduKHt9LCBxdWVyeSwge1xuICAgICAgICBleGFtcGxlc0NvdW50OiAwLFxuICAgICAgICBjb2xvclxuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCByZWNlaXZlRGF0YSA9IChxdWVyaWVzLCBleGFtcGxlcywgdGFzaykgPT4ge1xuICByZXR1cm4gZGlzcGF0Y2ggPT4ge1xuICAgIGNvbnN0IGNvbG9ycyA9IHJhbmRvbWNvbG9yKHtcbiAgICAgIGNvdW50OiBxdWVyaWVzLmxlbmd0aCxcbiAgICAgIGx1bWlub3NpdHk6ICdicmlnaHQnLFxuICAgICAgZm9ybWF0OiAncmdiJ1xuICAgIH0pXG5cbiAgICBjb25zdCBlbmhhbmNlZFF1ZXJpZXMgPSBxdWVyaWVzLm1hcCgocSwgaW5kZXgpID0+IE9iamVjdC5hc3NpZ24oe30sIHEsIHtcbiAgICAgIGV4YW1wbGVzQ291bnQ6IGV4YW1wbGVzLmZpbHRlcihlID0+IGUucXVlcnkgPT09IHEucXVlcnkpLmxlbmd0aCxcbiAgICAgIGNvbG9yOiBjb2xvcnNbaW5kZXhdXG4gICAgfSkpXG5cbiAgICAvLyBmb3IgKGxldCBxdWVyeSBvZiBxdWVyaWVzKSB7XG4gICAgLy8gICBpbmRleC5zZWFyY2gocXVlcnkucXVlcnksIChlcnIsIGNvbnRlbnQpID0+IHtcbiAgICAvLyAgICAgaWYgKGNvbnRlbnQuaGl0cy5sZW5ndGgpIHtcbiAgICAvLyAgICAgICBjb25zdCBtYXRjaGVkVGFzayA9IGNvbnRlbnQuaGl0cy5maWx0ZXIoaCA9PiBoLnRhc2tBbGlhcyA9PT0gdGFzay5hbGlhcylbMF1cbiAgICAvL1xuICAgIC8vICAgICAgIGRpc3BhdGNoKHtcbiAgICAvLyAgICAgICAgIHR5cGU6IFJFQ0VJVkVfUVVFUllfVEFTSyxcbiAgICAvLyAgICAgICAgIG1hdGNoZWRUYXNrOiBtYXRjaGVkVGFzay5faGlnaGxpZ2h0UmVzdWx0LnRleHQudmFsdWUsXG4gICAgLy8gICAgICAgICBxdWVyeTogcXVlcnkucXVlcnlcbiAgICAvLyAgICAgICB9KVxuICAgIC8vICAgICB9XG4gICAgLy8gICB9KVxuICAgIC8vIH1cblxuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFJFQ0VJVkVfREFUQSxcbiAgICAgIHF1ZXJpZXM6IGVuaGFuY2VkUXVlcmllcyxcbiAgICAgIGV4YW1wbGVzLFxuICAgICAgdGFza1xuICAgIH0pXG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9zdG9yZS9kYXRhQWN0aW9ucy5qc1xuICoqLyIsImV4cG9ydCBjb25zdCBSRUNFSVZFX1NUVURZID0gJ1JFQ0VJVkVfU1RVRFknXG5cbmV4cG9ydCBjb25zdCByZWNlaXZlU3R1ZHkgPSAoXG4gIHBhcnRpY2lwYW50SWQsXG4gIHNlc3Npb25JZCxcbiAgY29uZGl0aW9uLFxuICB0YXNrQWxpYXNcbikgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IFJFQ0VJVkVfU1RVRFksXG4gICAgcGFydGljaXBhbnRJZCxcbiAgICBzZXNzaW9uSWQsXG4gICAgY29uZGl0aW9uLFxuICAgIHRhc2tBbGlhc1xuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvc3RvcmUvc3R1ZHlBY3Rpb25zLmpzXG4gKiovIiwiaW1wb3J0IHtjcmVhdGVTdG9yZSwgYXBwbHlNaWRkbGV3YXJlfSBmcm9tICdyZWR1eCdcbmltcG9ydCBjcmVhdGVMb2dnZXIgZnJvbSAncmVkdXgtbG9nZ2VyJ1xuaW1wb3J0IHRodW5rTWlkZGxld2FyZSBmcm9tICdyZWR1eC10aHVuaydcbmltcG9ydCByb290UmVkdWNlciBmcm9tICcuL3Jvb3RSZWR1Y2VyJ1xuXG5jb25zdCBtaWRkbGV3YXJlID0gW3RodW5rTWlkZGxld2FyZV1cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gIGNvbnN0IGxvZ2dlciA9IGNyZWF0ZUxvZ2dlcigpXG4gIG1pZGRsZXdhcmUucHVzaChsb2dnZXIpXG59XG5cbmNvbnN0IGNvbmZpZ3VyZVN0b3JlID0gKGluaXRpYWxTdGF0ZSkgPT4ge1xuICByZXR1cm4gY3JlYXRlU3RvcmUoXG4gICAgcm9vdFJlZHVjZXIsXG4gICAgaW5pdGlhbFN0YXRlLFxuICAgIGFwcGx5TWlkZGxld2FyZSguLi5taWRkbGV3YXJlKVxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZ3VyZVN0b3JlXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvc3RvcmUvc3RvcmUuanNcbiAqKi8iLCJpbXBvcnQge2NvbWJpbmVSZWR1Y2Vyc30gZnJvbSAncmVkdXgnXG5pbXBvcnQgZGF0YSBmcm9tICcuL2RhdGFSZWR1Y2VyJ1xuaW1wb3J0IHVpIGZyb20gJy4vdWlSZWR1Y2VyJ1xuaW1wb3J0IHN0dWR5IGZyb20gJy4vc3R1ZHlSZWR1Y2VyJ1xuXG5jb25zdCByb290UmVkdWNlciA9IGNvbWJpbmVSZWR1Y2Vycyh7XG4gIGRhdGEsXG4gIHVpLFxuICBzdHVkeVxufSlcblxuZXhwb3J0IGRlZmF1bHQgcm9vdFJlZHVjZXJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9zdG9yZS9yb290UmVkdWNlci5qc1xuICoqLyIsImltcG9ydCB7UkVDRUlWRV9EQVRBLCBSRUNFSVZFX1FVRVJZX1RBU0ssIFJFQ0VJVkVfRVhBTVBMRSwgUkVDRUlWRV9RVUVSWSwgSU5DX0VYQU1QTEVfQ09VTlRFUn0gZnJvbSAnLi9kYXRhQWN0aW9ucydcbmltcG9ydCBpbml0aWFsU3RhdGUgZnJvbSAnLi9pbml0aWFsU3RhdGUnXG5cbmNvbnN0IGRhdGEgPSAoXG4gIHN0YXRlID0gaW5pdGlhbFN0YXRlLmRhdGEsXG4gIGFjdGlvblxuKSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIFJFQ0VJVkVfREFUQTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBxdWVyaWVzOiBhY3Rpb24ucXVlcmllcyxcbiAgICAgICAgZXhhbXBsZXM6IGFjdGlvbi5leGFtcGxlcyxcbiAgICAgICAgdGFzazogYWN0aW9uLnRhc2tcbiAgICAgIH0pXG4gICAgY2FzZSBSRUNFSVZFX0VYQU1QTEU6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgZXhhbXBsZXM6IFtcbiAgICAgICAgICAuLi5zdGF0ZS5leGFtcGxlcyxcbiAgICAgICAgICBhY3Rpb24uZXhhbXBsZVxuICAgICAgICBdXG4gICAgICB9KVxuICAgIGNhc2UgUkVDRUlWRV9RVUVSWTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBxdWVyaWVzOiBbXG4gICAgICAgICAgLi4uc3RhdGUucXVlcmllcyxcbiAgICAgICAgICBhY3Rpb24ucXVlcnlcbiAgICAgICAgXVxuICAgICAgfSlcbiAgICBjYXNlIElOQ19FWEFNUExFX0NPVU5URVI6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgcXVlcmllczogc3RhdGUucXVlcmllcy5tYXAocSA9PiB7XG4gICAgICAgICAgaWYgKHEucXVlcnkgPT09IGFjdGlvbi5xdWVyeSkge1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHEsIHtcbiAgICAgICAgICAgICAgZXhhbXBsZXNDb3VudDogcS5leGFtcGxlc0NvdW50ICsgMVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHFcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIGNhc2UgUkVDRUlWRV9RVUVSWV9UQVNLOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHF1ZXJpZXM6IHN0YXRlLnF1ZXJpZXMubWFwKHEgPT4ge1xuICAgICAgICAgIGlmIChxLnF1ZXJ5ID09PSBhY3Rpb24ucXVlcnkpIHtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBxLCB7XG4gICAgICAgICAgICAgIG1hdGNoZWRUYXNrOiBhY3Rpb24ubWF0Y2hlZFRhc2tcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBxXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZGF0YVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL3N0b3JlL2RhdGFSZWR1Y2VyLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQge1xuICBkYXRhOiB7XG4gICAgcXVlcmllczogW10sXG4gICAgZXhhbXBsZXM6IFtdLFxuICAgIHRhc2s6IHt9XG4gIH0sXG4gIHVpOiB7XG4gICAgaGlnaGxpZ2h0ZWRRdWVyeTogbnVsbCxcbiAgICBmb2N1c2VkUXVlcmllczogW10sXG4gICAgZm9jdXNlZEtleXdvcmRzOiBbXVxuICB9LFxuICBzdHVkeToge1xuICAgIHBhcnRpY2lwYW50SWQ6ICd0ZXN0JyxcbiAgICBzZXNzaW9uSWQ6ICd0ZXN0JyxcbiAgICBjb25kaXRpb246ICdzeXN0ZW0nLFxuICAgIHRhc2tBbGlhczogJ2NhcnMnXG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9zdG9yZS9pbml0aWFsU3RhdGUuanNcbiAqKi8iLCJpbXBvcnQge1xuICBUT0dHTEVfSElHSExJR0hUX1FVRVJZLFxuICBUT0dHTEVfRk9DVVNfUVVFUlksXG4gIFRPR0dMRV9GT0NVU19LRVlXT1JELFxuICBDTEVBUl9GT0NVU0VEX1FVRVJJRVMsXG4gIENMRUFSX0ZPQ1VTRURfS0VZV09SRFNcbn0gZnJvbSAnLi91aUFjdGlvbnMnXG5pbXBvcnQgaW5pdGlhbFN0YXRlIGZyb20gJy4vaW5pdGlhbFN0YXRlJ1xuXG5jb25zdCB1aSA9IChcbiAgc3RhdGUgPSBpbml0aWFsU3RhdGUudWksXG4gIGFjdGlvblxuKSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIFRPR0dMRV9ISUdITElHSFRfUVVFUlk6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgaGlnaGxpZ2h0ZWRRdWVyeTogYWN0aW9uLnF1ZXJ5ID09PSBzdGF0ZS5oaWdobGlnaHRlZFF1ZXJ5ID8gbnVsbCA6IGFjdGlvbi5xdWVyeVxuICAgICAgfSlcbiAgICBjYXNlIFRPR0dMRV9GT0NVU19RVUVSWTpcbiAgICAgIGNvbnN0IHRhcmdldFF1ZXJ5SW5kZXggPSBzdGF0ZS5mb2N1c2VkUXVlcmllcy5pbmRleE9mKGFjdGlvbi5xdWVyeSlcbiAgICAgIGxldCBmb2N1c2VkUXVlcmllcyA9IFtdXG4gICAgICBpZiAodGFyZ2V0UXVlcnlJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgZm9jdXNlZFF1ZXJpZXMgPSBbXG4gICAgICAgICAgLi4uc3RhdGUuZm9jdXNlZFF1ZXJpZXMsXG4gICAgICAgICAgYWN0aW9uLnF1ZXJ5XG4gICAgICAgIF1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvY3VzZWRRdWVyaWVzID0gW1xuICAgICAgICAgIC4uLnN0YXRlLmZvY3VzZWRRdWVyaWVzLnNsaWNlKDAsIHRhcmdldFF1ZXJ5SW5kZXgpLFxuICAgICAgICAgIC4uLnN0YXRlLmZvY3VzZWRRdWVyaWVzLnNsaWNlKHRhcmdldFF1ZXJ5SW5kZXggKyAxKVxuICAgICAgICBdXG4gICAgICB9XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgZm9jdXNlZFF1ZXJpZXNcbiAgICAgIH0pXG4gICAgY2FzZSBUT0dHTEVfRk9DVVNfS0VZV09SRDpcbiAgICAgIGNvbnN0IHRhcmdldEtleXdvcmRJbmRleCA9IHN0YXRlLmZvY3VzZWRLZXl3b3Jkcy5pbmRleE9mKGFjdGlvbi5rZXl3b3JkKVxuICAgICAgbGV0IGZvY3VzZWRLZXl3b3JkcyA9IFtdXG4gICAgICBpZiAodGFyZ2V0S2V5d29yZEluZGV4ID09PSAtMSkge1xuICAgICAgICBmb2N1c2VkS2V5d29yZHMgPSBbXG4gICAgICAgICAgLi4uc3RhdGUuZm9jdXNlZEtleXdvcmRzLFxuICAgICAgICAgIGFjdGlvbi5rZXl3b3JkXG4gICAgICAgIF1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvY3VzZWRLZXl3b3JkcyA9IFtcbiAgICAgICAgICAuLi5zdGF0ZS5mb2N1c2VkS2V5d29yZHMuc2xpY2UoMCwgdGFyZ2V0S2V5d29yZEluZGV4KSxcbiAgICAgICAgICAuLi5zdGF0ZS5mb2N1c2VkS2V5d29yZHMuc2xpY2UodGFyZ2V0S2V5d29yZEluZGV4ICsgMSlcbiAgICAgICAgXVxuICAgICAgfVxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGZvY3VzZWRLZXl3b3Jkc1xuICAgICAgfSlcbiAgICBjYXNlIENMRUFSX0ZPQ1VTRURfUVVFUklFUzpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBmb2N1c2VkUXVlcmllczogaW5pdGlhbFN0YXRlLnVpLmZvY3VzZWRRdWVyaWVzXG4gICAgICB9KVxuICAgIGNhc2UgQ0xFQVJfRk9DVVNFRF9LRVlXT1JEUzpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBmb2N1c2VkS2V5d29yZHM6IGluaXRpYWxTdGF0ZS51aS5mb2N1c2VkS2V5d29yZHNcbiAgICAgIH0pXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHVpXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvc3RvcmUvdWlSZWR1Y2VyLmpzXG4gKiovIiwiaW1wb3J0IHtSRUNFSVZFX1NUVURZfSBmcm9tICcuL3N0dWR5QWN0aW9ucydcbmltcG9ydCBpbml0aWFsU3RhdGUgZnJvbSAnLi9pbml0aWFsU3RhdGUnXG5cbmNvbnN0IHN0dWR5ID0gKFxuICBzdGF0ZSA9IGluaXRpYWxTdGF0ZS5zdHVkeSxcbiAgYWN0aW9uXG4pID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgUkVDRUlWRV9TVFVEWTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBwYXJ0aWNpcGFudElkOiBhY3Rpb24ucGFydGljaXBhbnRJZCxcbiAgICAgICAgc2Vzc2lvbklkOiBhY3Rpb24uc2Vzc2lvbklkLFxuICAgICAgICBjb25kaXRpb246IGFjdGlvbi5jb25kaXRpb24sXG4gICAgICAgIHRhc2tBbGlhczogYWN0aW9uLnRhc2tBbGlhc1xuICAgICAgfSlcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgc3R1ZHlcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9zdG9yZS9zdHVkeVJlZHVjZXIuanNcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvc3R5bGVzL3Jlc2V0LmNzc1xuICoqIG1vZHVsZSBpZCA9IDYxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5jb25zdCBGbGV4ID0gKHtcbiAgZmxleERpcmVjdGlvbiA9ICdyb3cnLFxuICBqdXN0aWZ5Q29udGVudCA9ICdmbGV4LXN0YXJ0JyxcbiAgYWxpZ25JdGVtcyA9ICdjZW50ZXInLFxuICBjaGlsZHJlblxufSkgPT4ge1xuICBjb25zdCBzdHlsZSA9IHtcbiAgICBmbGV4RGlyZWN0aW9uLFxuICAgIGFsaWduSXRlbXMsXG4gICAganVzdGlmeUNvbnRlbnQsXG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgIHdpZHRoOiAnMTAwJScsXG4gICAgaGVpZ2h0OiAnMTAwJSdcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17c3R5bGV9PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvZGl2PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IEZsZXhcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9sYXlvdXRzL0ZsZXgvRmxleC5qc3hcbiAqKi8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQURBOzs7Ozs7Ozs7Ozs7Ozs7QUNiQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUdBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUlBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFJQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUZBO0FBQUE7QUFMQTtBQURBO0FBZ0JBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFNQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUZBO0FBQUE7QUFMQTtBQURBO0FBZ0JBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFuREE7QUEwREE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQTNEQTtBQWdFQTs7OztBQTNHQTtBQUNBO0FBNkdBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFPQTs7Ozs7OztBQ3pJQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBQ0E7QUFHQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFJQTtBQUxBO0FBUUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUZBO0FBSUE7Ozs7Ozs7QUMvQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBSEE7QUFEQTtBQVFBOzs7O0FBYkE7QUFDQTtBQWVBO0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFEQTtBQUdBOzs7Ozs7O0FDM0JBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNEQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQ0E7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUlBO0FBSkE7QUFBQTtBQU9BO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBOzs7Ozs7O0FDM0NBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckNBO0FBQ0E7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUhBO0FBREE7QUFRQTs7OztBQWJBO0FBQ0E7QUFlQTtBQUVBO0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVkE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQVdBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQXZCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUF3QkE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBREE7QUFHQTs7Ozs7OztBQ3JEQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUNBO0FBSUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFHQTtBQUhBO0FBQUE7QUFNQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTs7Ozs7OztBQ3hDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFTQTs7Ozs7Ozs7Ozs7Ozs7O0FDMUJBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQUNBO0FBR0E7QUFBQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFEQTtBQUhBO0FBREE7QUFEQTtBQWlCQTs7OztBQWpDQTtBQUNBO0FBbUNBOzs7Ozs7O0FDekNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNEQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQ0E7QUFPQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFNQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBWEE7QUFnQkE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBSEE7QUFLQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFPQTs7Ozs7OztBQzFEQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7QUFHQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFIQTtBQU1BO0FBQ0E7QUFDQTtBQVRBO0FBWUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRkE7QUFJQTs7Ozs7OztBQ25DQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFDQTtBQUdBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBTEE7QUFEQTtBQWNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDbENBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNEQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUlBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDbkJBO0FBQ0E7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBO0FBSUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFJQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBSkE7QUFPQTtBQVpBO0FBZUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUlBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFKQTtBQU9BO0FBM0JBO0FBOEJBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQS9CQTtBQWlDQTs7Ozs7OztBQzVHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBSUE7QUFDQTs7Ozs7Ozs7QUNiQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTs7Ozs7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0hBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQUtBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUZBO0FBQUE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTs7Ozs7Ozs7Ozs7OztBQzlFQTtBQUNBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BOzs7Ozs7Ozs7Ozs7O0FDZkE7QUFDQTtBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNuQkE7QUFDQTtBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUNBO0FBS0E7Ozs7Ozs7Ozs7Ozs7OztBQ1hBO0FBQ0E7QUFBQTtBQUNBOzs7Ozs7O0FBQ0E7QUFHQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQURBO0FBTUE7QUFDQTtBQUNBO0FBREE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFXQTtBQUNBO0FBOUNBO0FBZ0RBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQVhBOzs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBTUE7QUFDQTs7Ozs7OztBQUNBO0FBR0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFoREE7QUFrREE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2hFQTtBQUNBO0FBQUE7QUFDQTs7Ozs7QUFDQTtBQUdBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBVEE7QUFXQTtBQUNBOzs7Ozs7OztBQ25CQTs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7Ozs7O0FBQ0E7QUFLQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQUNBO0FBUUE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUlBO0FBQ0E7Ozs7OyIsInNvdXJjZVJvb3QiOiIifQ==