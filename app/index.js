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

	var _QueryView = __webpack_require__(514);

	var _QueryView2 = _interopRequireDefault(_QueryView);

	var _Title = __webpack_require__(519);

	var _Title2 = _interopRequireDefault(_Title);

	var _socket = __webpack_require__(521);

	var _socket2 = _interopRequireDefault(_socket);

	var _dataActions = __webpack_require__(570);

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
	          _react2.default.createElement(
	            'div',
	            { className: _App2.default.AppSidebar__title },
	            _react2.default.createElement(_Title2.default, { title: 'Searches' })
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: _App2.default.AppSidebar__body },
	            _react2.default.createElement(_QueryList2.default, null)
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: _App2.default.AppSidebar__title },
	            _react2.default.createElement(_Title2.default, { title: 'Common Keywords' })
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: _App2.default.AppSidebar__body },
	            _react2.default.createElement(_KeywordList2.default, null)
	          )
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
	    focusedQueries: state.ui.focusedQueries,
	    focusedKeywords: state.ui.focusedKeywords
	  };
		})(App);

/***/ },

/***/ 495:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"App":"App__App___lBEXI","App__main":"App__App__main___2VZji","AppSidebar":"App__AppSidebar___wXvF4","AppSidebar__header":"App__AppSidebar__header___2WtqC","AppSidebar__body":"App__AppSidebar__body___ZdyV_","AppSidebar__title":"App__AppSidebar__title___12hSB"};

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

	var _KeywordExampleList = __webpack_require__(516);

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

	var _reactRedux = __webpack_require__(472);

	var _QueryView = __webpack_require__(515);

	var _QueryView2 = _interopRequireDefault(_QueryView);

	var _ExampleList = __webpack_require__(508);

	var _ExampleList2 = _interopRequireDefault(_ExampleList);

	var _KeywordExampleList = __webpack_require__(516);

	var _KeywordExampleList2 = _interopRequireDefault(_KeywordExampleList);

	var _Block = __webpack_require__(518);

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

/***/ 515:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"QueryView":"QueryView__QueryView___3aonz"};

/***/ },

/***/ 516:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _KeywordExampleList = __webpack_require__(517);

	var _KeywordExampleList2 = _interopRequireDefault(_KeywordExampleList);

	var _ExampleList = __webpack_require__(508);

	var _ExampleList2 = _interopRequireDefault(_ExampleList);

	var _Block = __webpack_require__(518);

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
	    return '';
	  }
	};

	exports.default = KeywordExampleList;

/***/ },

/***/ 517:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"KeywordExampleList":"KeywordExampleList__KeywordExampleList___1E_11","KeywordExampleList__keyword":"KeywordExampleList__KeywordExampleList__keyword___3mv7N","KeywordExampleList__examples":"KeywordExampleList__KeywordExampleList__examples___2Qbfq"};

/***/ },

/***/ 518:
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

/***/ }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvQXBwL0FwcC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQXBwL0FwcC5jc3MiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL1Rhc2tEZXNjcmlwdGlvbi9UYXNrRGVzY3JpcHRpb24uanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1Rhc2tEZXNjcmlwdGlvbi9UYXNrRGVzY3JpcHRpb24uY3NzIiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9RdWVyeUxpc3QvUXVlcnlMaXN0LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9RdWVyeUxpc3QvUXVlcnlMaXN0LmNzcyIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvUXVlcnkvUXVlcnkuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1F1ZXJ5L1F1ZXJ5LmNzcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3VpQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvS2V5d29yZExpc3QvS2V5d29yZExpc3QuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0tleXdvcmRMaXN0L0tleXdvcmRMaXN0LmNzcyIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvS2V5d29yZC9LZXl3b3JkLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9LZXl3b3JkL0tleXdvcmQuY3NzIiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9Db2xsZWN0aW9uVmlldy9Db2xsZWN0aW9uVmlldy5qc3giLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL0V4YW1wbGVMaXN0L0V4YW1wbGVMaXN0LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9FeGFtcGxlTGlzdC9FeGFtcGxlTGlzdC5jc3MiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL0V4YW1wbGUvRXhhbXBsZS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRXhhbXBsZS9FeGFtcGxlLmNzcyIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvS2V5d29yZFZpZXcvS2V5d29yZFZpZXcuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0tleXdvcmRWaWV3L0tleXdvcmRWaWV3LmNzcyIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvUXVlcnlWaWV3L1F1ZXJ5Vmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvUXVlcnlWaWV3L1F1ZXJ5Vmlldy5jc3MiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL0tleXdvcmRFeGFtcGxlTGlzdC9LZXl3b3JkRXhhbXBsZUxpc3QuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0tleXdvcmRFeGFtcGxlTGlzdC9LZXl3b3JkRXhhbXBsZUxpc3QuY3NzIiwid2VicGFjazovLy9zcmMvbGF5b3V0cy9CbG9jay9CbG9jay5qc3giLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL1RpdGxlL1RpdGxlLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9UaXRsZS9UaXRsZS5jc3MiLCJ3ZWJwYWNrOi8vL3NyYy9zdG9yZS9zb2NrZXQuanMiLCJ3ZWJwYWNrOi8vL3NyYy9zdG9yZS9kYXRhQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3N0dWR5QWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3N0b3JlLmpzIiwid2VicGFjazovLy9zcmMvc3RvcmUvcm9vdFJlZHVjZXIuanMiLCJ3ZWJwYWNrOi8vL3NyYy9zdG9yZS9kYXRhUmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL2luaXRpYWxTdGF0ZS5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3VpUmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3N0dWR5UmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL3Jlc2V0LmNzcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2JhYmVsLXBvbHlmaWxsJ1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJ1xuaW1wb3J0IEFwcCBmcm9tICcuL2NvbXBvbmVudHMvQXBwJ1xuaW1wb3J0IGNvbmZpZ3VyZVN0b3JlIGZyb20gJy4vc3RvcmUnXG5pbXBvcnQge1Byb3ZpZGVyfSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0ICcuL3N0eWxlcy9yZXNldC5jc3MnXG5cbmNvbnN0IHN0b3JlID0gY29uZmlndXJlU3RvcmUoKVxuXG5SZWFjdERPTS5yZW5kZXIoKFxuICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICA8QXBwIC8+XG4gIDwvUHJvdmlkZXI+XG4pLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzaWduRml4YXRpb25BcHAnKSlcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9pbmRleC5qc3hcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4J1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vQXBwLmNzcydcbmltcG9ydCBUYXNrRGVzY3JpcHRpb24gZnJvbSAnLi4vVGFza0Rlc2NyaXB0aW9uJ1xuaW1wb3J0IFF1ZXJ5TGlzdCBmcm9tICcuLi9RdWVyeUxpc3QnXG5pbXBvcnQgS2V5d29yZExpc3QgZnJvbSAnLi4vS2V5d29yZExpc3QnXG5pbXBvcnQgQ29sbGVjdGlvblZpZXcgZnJvbSAnLi4vQ29sbGVjdGlvblZpZXcnXG5pbXBvcnQgS2V5d29yZFZpZXcgZnJvbSAnLi4vS2V5d29yZFZpZXcnXG5pbXBvcnQgUXVlcnlWaWV3IGZyb20gJy4uL1F1ZXJ5VmlldydcbmltcG9ydCBUaXRsZSBmcm9tICcuLi9UaXRsZSdcblxuaW1wb3J0IHNvY2tldCBmcm9tICcuLi8uLi9zdG9yZS9zb2NrZXQnXG5pbXBvcnQge3JlY2VpdmVEYXRhLCByZWNlaXZlRXhhbXBsZSwgcmVjZWl2ZVF1ZXJ5fSBmcm9tICcuLi8uLi9zdG9yZS9kYXRhQWN0aW9ucydcbmltcG9ydCB7cmVjZWl2ZVN0dWR5fSBmcm9tICcuLi8uLi9zdG9yZS9zdHVkeUFjdGlvbnMnXG5cbmNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudFdpbGxNb3VudCAoKSB7XG4gICAgY29uc3Qge2Rpc3BhdGNofSA9IHRoaXMucHJvcHNcblxuICAgIHNvY2tldC5lbWl0KCdnZXQgc3R1ZHknKVxuXG4gICAgc29ja2V0Lm9uKCdzdHVkeScsIChkYXRhKSA9PiB7XG4gICAgICBkaXNwYXRjaChyZWNlaXZlU3R1ZHkoZGF0YS5wYXJ0aWNpcGFudElkLCBkYXRhLnNlc3Npb25JZCwgZGF0YS5jb25kaXRpb24sIGRhdGEudGFza0FsaWFzKSlcbiAgICAgIHNvY2tldC5lbWl0KCdnZXQgZGF0YScsIHtzZXNzaW9uSWQ6IGRhdGEuc2Vzc2lvbklkLCB0YXNrQWxpYXM6IGRhdGEudGFza0FsaWFzfSlcbiAgICB9KVxuXG4gICAgc29ja2V0Lm9uKCdjb25maXJtIGNyZWF0ZSBleGFtcGxlJywgZSA9PiB7XG4gICAgICBkaXNwYXRjaChyZWNlaXZlRXhhbXBsZShlKSlcbiAgICB9KVxuXG4gICAgc29ja2V0Lm9uKCdjb25maXJtIGNyZWF0ZSBxdWVyeScsIHEgPT4ge1xuICAgICAgZGlzcGF0Y2gocmVjZWl2ZVF1ZXJ5KHEpKVxuICAgIH0pXG5cbiAgICBzb2NrZXQub24oJ2RhdGEnLCAoZGF0YSkgPT4ge1xuICAgICAgZGlzcGF0Y2gocmVjZWl2ZURhdGEoZGF0YS5xdWVyaWVzLCBkYXRhLmV4YW1wbGVzLCBkYXRhLnRhc2spKVxuICAgIH0pXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHtmb2N1c2VkUXVlcmllcywgZm9jdXNlZEtleXdvcmRzfSA9IHRoaXMucHJvcHNcblxuICAgIGxldCBib2R5RWwgPSAnJ1xuICAgIGlmIChmb2N1c2VkUXVlcmllcy5sZW5ndGggPiAwKSB7XG4gICAgICBib2R5RWwgPSAoXG4gICAgICAgIDxRdWVyeVZpZXcgLz5cbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKGZvY3VzZWRLZXl3b3Jkcy5sZW5ndGggPiAwKSB7XG4gICAgICBib2R5RWwgPSAoXG4gICAgICAgIDxLZXl3b3JkVmlldyAvPlxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICBib2R5RWwgPSAoXG4gICAgICAgIDxDb2xsZWN0aW9uVmlldyAvPlxuICAgICAgKVxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLkFwcH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuQXBwU2lkZWJhcn0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5BcHBTaWRlYmFyX190aXRsZX0+XG4gICAgICAgICAgICA8VGl0bGUgdGl0bGU9XCJEZXNpZ24gVGFza1wiIC8+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLkFwcFNpZGViYXJfX2hlYWRlcn0+XG4gICAgICAgICAgICA8VGFza0Rlc2NyaXB0aW9uIC8+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLkFwcFNpZGViYXJfX3RpdGxlfT5cbiAgICAgICAgICAgIDxUaXRsZSB0aXRsZT1cIlNlYXJjaGVzXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuQXBwU2lkZWJhcl9fYm9keX0+XG4gICAgICAgICAgICA8UXVlcnlMaXN0IC8+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLkFwcFNpZGViYXJfX3RpdGxlfT5cbiAgICAgICAgICAgIDxUaXRsZSB0aXRsZT1cIkNvbW1vbiBLZXl3b3Jkc1wiIC8+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLkFwcFNpZGViYXJfX2JvZHl9PlxuICAgICAgICAgICAgPEtleXdvcmRMaXN0IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuQXBwX19tYWlufT5cbiAgICAgICAgICB7Ym9keUVsfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxuICBzdGF0ZSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNlc3Npb25JZDogc3RhdGUuc3R1ZHkuc2Vzc2lvbklkLFxuICAgICAgdGFza0FsaWFzOiBzdGF0ZS5zdHVkeS50YXNrQWxpYXMsXG4gICAgICBmb2N1c2VkUXVlcmllczogc3RhdGUudWkuZm9jdXNlZFF1ZXJpZXMsXG4gICAgICBmb2N1c2VkS2V5d29yZHM6IHN0YXRlLnVpLmZvY3VzZWRLZXl3b3Jkc1xuICAgIH1cbiAgfVxuKShBcHApXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvY29tcG9uZW50cy9BcHAvQXBwLmpzeFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcIkFwcFwiOlwiQXBwX19BcHBfX19sQkVYSVwiLFwiQXBwX19tYWluXCI6XCJBcHBfX0FwcF9fbWFpbl9fXzJWWmppXCIsXCJBcHBTaWRlYmFyXCI6XCJBcHBfX0FwcFNpZGViYXJfX193WHZGNFwiLFwiQXBwU2lkZWJhcl9faGVhZGVyXCI6XCJBcHBfX0FwcFNpZGViYXJfX2hlYWRlcl9fXzJXdHFDXCIsXCJBcHBTaWRlYmFyX19ib2R5XCI6XCJBcHBfX0FwcFNpZGViYXJfX2JvZHlfX19aZHlWX1wiLFwiQXBwU2lkZWJhcl9fdGl0bGVcIjpcIkFwcF9fQXBwU2lkZWJhcl9fdGl0bGVfX18xMmhTQlwifTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvQXBwL0FwcC5jc3NcbiAqKiBtb2R1bGUgaWQgPSA0OTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnXG5cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9UYXNrRGVzY3JpcHRpb24uY3NzJ1xuXG5jb25zdCBUYXNrRGVzY3JpcHRpb24gPSAoe1xuICB0YXNrLFxuICBmb2N1c2VkUXVlcmllc1xufSkgPT4ge1xuICBjb25zdCBxdWVyeVRhc2tzID0gZm9jdXNlZFF1ZXJpZXMubWFwKChxLCBpKSA9PiB7XG4gICAgbGV0IG1hdGNoZWRUYXNrID0gcS5tYXRjaGVkVGFza1xuXG4gICAgaWYgKG1hdGNoZWRUYXNrKSB7XG4gICAgICB3aGlsZSAobWF0Y2hlZFRhc2suaW5kZXhPZignPGVtPicpICE9PSAtMSkge1xuICAgICAgICBjb25zdCBpbnNlcnRQb3NpdGlvbiA9IG1hdGNoZWRUYXNrLmluZGV4T2YoJzxlbT4nKSArIDNcbiAgICAgICAgY29uc3QgcXVlcnlDb2xvciA9IGByZ2JhKCR7cS5jb2xvci5zbGljZSg0LCBxLmNvbG9yLmxlbmd0aCAtIDEpfSwgMC4zKWBcbiAgICAgICAgbWF0Y2hlZFRhc2sgPSBgJHttYXRjaGVkVGFzay5zbGljZSgwLCBpbnNlcnRQb3NpdGlvbil9IHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogJHtxdWVyeUNvbG9yfTtcIiAke21hdGNoZWRUYXNrLnNsaWNlKGluc2VydFBvc2l0aW9uKX1gXG4gICAgICB9XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuVGFza0Rlc2NyaXB0aW9uX19xdWVyeX1cbiAgICAgICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTD17e19faHRtbDogbWF0Y2hlZFRhc2t9fSAvPlxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJydcbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLlRhc2tEZXNjcmlwdGlvbn0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLlRhc2tEZXNjcmlwdGlvbl9fbWFpbn0+XG4gICAgICAgIHt0YXNrLnRleHR9XG4gICAgICA8L2Rpdj5cblxuICAgICAge3F1ZXJ5VGFza3N9XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcbiAgc3RhdGUgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICB0YXNrOiBzdGF0ZS5kYXRhLnRhc2sgfHwge30sXG4gICAgICBmb2N1c2VkUXVlcmllczogc3RhdGUuZGF0YS5xdWVyaWVzLmZpbHRlcihxID0+IHN0YXRlLnVpLmZvY3VzZWRRdWVyaWVzLmluZGV4T2YocS5xdWVyeSkgIT09IC0xKVxuICAgIH1cbiAgfVxuKShUYXNrRGVzY3JpcHRpb24pXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvY29tcG9uZW50cy9UYXNrRGVzY3JpcHRpb24vVGFza0Rlc2NyaXB0aW9uLmpzeFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcIlRhc2tEZXNjcmlwdGlvblwiOlwiVGFza0Rlc2NyaXB0aW9uX19UYXNrRGVzY3JpcHRpb25fX18xdE9LOVwiLFwiVGFza0Rlc2NyaXB0aW9uX19tYWluXCI6XCJUYXNrRGVzY3JpcHRpb25fX1Rhc2tEZXNjcmlwdGlvbl9fbWFpbl9fX00zTklOXCIsXCJUYXNrRGVzY3JpcHRpb25fX3F1ZXJ5XCI6XCJUYXNrRGVzY3JpcHRpb25fX1Rhc2tEZXNjcmlwdGlvbl9fcXVlcnlfX18xaDJxT1wifTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvVGFza0Rlc2NyaXB0aW9uL1Rhc2tEZXNjcmlwdGlvbi5jc3NcbiAqKiBtb2R1bGUgaWQgPSA0OTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnXG5cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9RdWVyeUxpc3QuY3NzJ1xuaW1wb3J0IFF1ZXJ5IGZyb20gJy4uL1F1ZXJ5J1xuXG5jbGFzcyBRdWVyeUxpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHtxdWVyaWVzfSA9IHRoaXMucHJvcHNcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLlF1ZXJ5TGlzdH0+XG4gICAgICAgIHtxdWVyaWVzLm1hcCgocSwgaW5kZXgpID0+XG4gICAgICAgICAgPFF1ZXJ5XG4gICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgcXVlcnk9e3F9IC8+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcbiAgc3RhdGUgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBxdWVyaWVzOiBbLi4uc3RhdGUuZGF0YS5xdWVyaWVzXS5zb3J0KChhLCBiKSA9PiBiLmV4YW1wbGVzQ291bnQgLSBhLmV4YW1wbGVzQ291bnQpXG4gICAgfVxuICB9XG4pKFF1ZXJ5TGlzdClcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jb21wb25lbnRzL1F1ZXJ5TGlzdC9RdWVyeUxpc3QuanN4XG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiUXVlcnlMaXN0XCI6XCJRdWVyeUxpc3RfX1F1ZXJ5TGlzdF9fXzJIY2dMXCJ9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9RdWVyeUxpc3QvUXVlcnlMaXN0LmNzc1xuICoqIG1vZHVsZSBpZCA9IDQ5OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL1F1ZXJ5LmNzcydcblxuaW1wb3J0IHt0b2dnbGVGb2N1c1F1ZXJ5fSBmcm9tICcuLi8uLi9zdG9yZS91aUFjdGlvbnMnXG5cbmNvbnN0IFF1ZXJ5ID0gKHtcbiAgcXVlcnksXG4gIGZvY3VzZWRRdWVyaWVzLFxuICB0b2dnbGVGb2N1c1xufSkgPT4ge1xuICBsZXQgc3R5bGUgPSB7fVxuICBsZXQgY2xhc3NOYW1lcyA9IFtzdHlsZXMuUXVlcnldXG4gIGlmIChmb2N1c2VkUXVlcmllcy5pbmRleE9mKHF1ZXJ5LnF1ZXJ5KSAhPT0gLTEpIHtcbiAgICBzdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgcmdiYSgke3F1ZXJ5LmNvbG9yLnNsaWNlKDQsIHF1ZXJ5LmNvbG9yLmxlbmd0aCAtIDEpfSwgMC4zKWBcbiAgICBjbGFzc05hbWVzLnB1c2goc3R5bGVzLlF1ZXJ5X2lzRm9jdXNlZClcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgb25DbGljaz17dG9nZ2xlRm9jdXN9XG4gICAgICBzdHlsZT17c3R5bGV9XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMuam9pbignICcpfT5cbiAgICAgIHtxdWVyeS5xdWVyeX0gKHtxdWVyeS5leGFtcGxlc0NvdW50fSlcbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxuICBzdGF0ZSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGZvY3VzZWRRdWVyaWVzOiBzdGF0ZS51aS5mb2N1c2VkUXVlcmllc1xuICAgIH1cbiAgfSxcbiAgKGRpc3BhdGNoLCBvd25Qcm9wcykgPT4ge1xuICAgIGNvbnN0IHtxdWVyeToge3F1ZXJ5fX0gPSBvd25Qcm9wc1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRvZ2dsZUZvY3VzOiAoKSA9PiB7XG4gICAgICAgIGRpc3BhdGNoKHRvZ2dsZUZvY3VzUXVlcnkocXVlcnkpKVxuICAgICAgfVxuICAgIH1cbiAgfVxuKShRdWVyeSlcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jb21wb25lbnRzL1F1ZXJ5L1F1ZXJ5LmpzeFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcIlF1ZXJ5XCI6XCJRdWVyeV9fUXVlcnlfX18zMnlWUFwiLFwiUXVlcnlfaXNGb2N1c2VkXCI6XCJRdWVyeV9fUXVlcnlfaXNGb2N1c2VkX19fM1l1NlpcIn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL1F1ZXJ5L1F1ZXJ5LmNzc1xuICoqIG1vZHVsZSBpZCA9IDUwMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0IGNvbnN0IFRPR0dMRV9ISUdITElHSFRfUVVFUlkgPSAnVE9HR0xFX0hJR0hMSUdIVF9RVUVSWSdcbmV4cG9ydCBjb25zdCBUT0dHTEVfRk9DVVNfUVVFUlkgPSAnVE9HR0xFX0ZPQ1VTX1FVRVJZJ1xuZXhwb3J0IGNvbnN0IFRPR0dMRV9GT0NVU19LRVlXT1JEID0gJ1RPR0dMRV9GT0NVU19LRVlXT1JEJ1xuXG5leHBvcnQgY29uc3QgdG9nZ2xlSGlnaGxpZ2h0UXVlcnkgPSAocXVlcnkpID0+IHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBUT0dHTEVfSElHSExJR0hUX1FVRVJZLFxuICAgIHF1ZXJ5XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHRvZ2dsZUZvY3VzUXVlcnkgPSAocXVlcnkpID0+IHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBUT0dHTEVfRk9DVVNfUVVFUlksXG4gICAgcXVlcnlcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgdG9nZ2xlRm9jdXNLZXl3b3JkID0gKGtleXdvcmQpID0+IHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBUT0dHTEVfRk9DVVNfS0VZV09SRCxcbiAgICBrZXl3b3JkXG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9zdG9yZS91aUFjdGlvbnMuanNcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4J1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vS2V5d29yZExpc3QuY3NzJ1xuaW1wb3J0IEtleXdvcmQgZnJvbSAnLi4vS2V5d29yZCdcblxuY2xhc3MgS2V5d29yZExpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHtrZXl3b3Jkc30gPSB0aGlzLnByb3BzXG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5LZXl3b3JkTGlzdH0+XG4gICAgICAgIHtrZXl3b3Jkcy5tYXAoKGssIGluZGV4KSA9PlxuICAgICAgICAgIDxLZXl3b3JkXG4gICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAga2V5d29yZD17a30gLz5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxuICBzdGF0ZSA9PiB7XG4gICAgY29uc3QgcXVlcmllcyA9IHN0YXRlLnVpLmZvY3VzZWRRdWVyaWVzLmxlbmd0aFxuICAgICAgPyBzdGF0ZS51aS5mb2N1c2VkUXVlcmllc1xuICAgICAgOiBzdGF0ZS5kYXRhLnF1ZXJpZXMubWFwKHEgPT4gcS5xdWVyeSlcbiAgICBjb25zdCBleGFtcGxlcyA9IHN0YXRlLmRhdGEuZXhhbXBsZXMuZmlsdGVyKGUgPT4gcXVlcmllcy5pbmRleE9mKGUucXVlcnkpICE9PSAtMSlcbiAgICBjb25zdCBzdGVtcyA9IGV4YW1wbGVzLnJlZHVjZSgoY2FycnksIGN1cnJlbnQpID0+IFsuLi5jYXJyeSwgLi4uY3VycmVudC5pbWFnZURlc2NyaXB0aW9uU3RlbXNdLCBbXSlcbiAgICBjb25zdCBzdGVtRGljdGlvbmFyeSA9IGV4YW1wbGVzLnJlZHVjZSgoY2FycnksIGN1cnJlbnQpID0+IE9iamVjdC5hc3NpZ24oe30sIGNhcnJ5LCBjdXJyZW50LnN0ZW1EaWN0aW9uYXJ5KSwge30pXG5cbiAgICBjb25zdCBrZXl3b3JkcyA9IFtdXG4gICAgY29uc3Qgc3RlbUluZGV4TWFwID0ge31cblxuICAgIGZvciAobGV0IHN0ZW0gb2Ygc3RlbXMpIHtcbiAgICAgIGNvbnN0IHN0ZW1JbmRleCA9IHN0ZW1JbmRleE1hcFtzdGVtXVxuICAgICAgaWYgKHN0ZW1JbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGtleXdvcmRzW3N0ZW1JbmRleF0uZnJlcXVlbmN5ICs9IDFcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0ZW1JbmRleE1hcFtzdGVtXSA9IGtleXdvcmRzLmxlbmd0aFxuICAgICAgICBrZXl3b3Jkcy5wdXNoKHtcbiAgICAgICAgICBmcmVxdWVuY3k6IDEsXG4gICAgICAgICAga2V5d29yZDogc3RlbURpY3Rpb25hcnlbc3RlbV0sXG4gICAgICAgICAgc3RlbVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKGtleXdvcmRzKVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGtleXdvcmRzOiBrZXl3b3Jkcy5zb3J0KChhLCBiKSA9PiBiLmZyZXF1ZW5jeSAtIGEuZnJlcXVlbmN5KVxuICAgIH1cbiAgfVxuKShLZXl3b3JkTGlzdClcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jb21wb25lbnRzL0tleXdvcmRMaXN0L0tleXdvcmRMaXN0LmpzeFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcIktleXdvcmRMaXN0XCI6XCJLZXl3b3JkTGlzdF9fS2V5d29yZExpc3RfX19FNmdvN1wifTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvS2V5d29yZExpc3QvS2V5d29yZExpc3QuY3NzXG4gKiogbW9kdWxlIGlkID0gNTA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4J1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vS2V5d29yZC5jc3MnXG5cbmltcG9ydCB7dG9nZ2xlRm9jdXNLZXl3b3JkfSBmcm9tICcuLi8uLi9zdG9yZS91aUFjdGlvbnMnXG5cbmNvbnN0IEtleXdvcmQgPSAoe1xuICBrZXl3b3JkLFxuICBmb2N1c2VkS2V5d29yZHMsXG4gIHRvZ2dsZUZvY3VzXG59KSA9PiB7XG4gIGxldCBjbGFzc05hbWVzID0gW3N0eWxlcy5LZXl3b3JkXVxuICBpZiAoZm9jdXNlZEtleXdvcmRzLmluZGV4T2Yoa2V5d29yZC5rZXl3b3JkKSAhPT0gLTEpIHtcbiAgICBjbGFzc05hbWVzLnB1c2goc3R5bGVzLktleXdvcmRfaXNGb2N1c2VkKVxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBvbkNsaWNrPXt0b2dnbGVGb2N1c31cbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5qb2luKCcgJyl9PlxuICAgICAge2tleXdvcmQua2V5d29yZH0gKHtrZXl3b3JkLmZyZXF1ZW5jeX0pXG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcbiAgc3RhdGUgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBmb2N1c2VkS2V5d29yZHM6IHN0YXRlLnVpLmZvY3VzZWRLZXl3b3Jkc1xuICAgIH1cbiAgfSxcbiAgKGRpc3BhdGNoLCBvd25Qcm9wcykgPT4ge1xuICAgIGNvbnN0IHtrZXl3b3JkOiB7a2V5d29yZH19ID0gb3duUHJvcHNcblxuICAgIHJldHVybiB7XG4gICAgICB0b2dnbGVGb2N1czogKCkgPT4ge1xuICAgICAgICBkaXNwYXRjaCh0b2dnbGVGb2N1c0tleXdvcmQoa2V5d29yZCkpXG4gICAgICB9XG4gICAgfVxuICB9XG4pKEtleXdvcmQpXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvY29tcG9uZW50cy9LZXl3b3JkL0tleXdvcmQuanN4XG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiS2V5d29yZFwiOlwiS2V5d29yZF9fS2V5d29yZF9fXzJFa1NZXCIsXCJLZXl3b3JkX2lzRm9jdXNlZFwiOlwiS2V5d29yZF9fS2V5d29yZF9pc0ZvY3VzZWRfX193ME1SU1wifTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvS2V5d29yZC9LZXl3b3JkLmNzc1xuICoqIG1vZHVsZSBpZCA9IDUwNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0IEV4YW1wbGVMaXN0IGZyb20gJy4uL0V4YW1wbGVMaXN0J1xuXG5jb25zdCBDb2xsZWN0aW9uVmlldyA9ICh7XG4gIGV4YW1wbGVzXG59KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEV4YW1wbGVMaXN0XG4gICAgICBuQ29scz17NX1cbiAgICAgIGV4YW1wbGVzPXtleGFtcGxlc30gLz5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxuICBzdGF0ZSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGV4YW1wbGVzOiBbLi4uc3RhdGUuZGF0YS5leGFtcGxlc10uc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBpZiAoYi5jcmVhdGVkQXQgPiBhLmNyZWF0ZWRBdCkge1xuICAgICAgICAgIHJldHVybiAtMVxuICAgICAgICB9IGVsc2UgaWYgKGEuY3JlYXRlZEF0ID49IGIuY3JlYXRlZEF0KSB7XG4gICAgICAgICAgcmV0dXJuIDFcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbikoQ29sbGVjdGlvblZpZXcpXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvY29tcG9uZW50cy9Db2xsZWN0aW9uVmlldy9Db2xsZWN0aW9uVmlldy5qc3hcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9FeGFtcGxlTGlzdC5jc3MnXG5pbXBvcnQgRXhhbXBsZSBmcm9tICcuLi9FeGFtcGxlJ1xuXG5jbGFzcyBFeGFtcGxlTGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3Qge2V4YW1wbGVzLCBuQ29sc30gPSB0aGlzLnByb3BzXG4gICAgY29uc3QgY29sdW1ucyA9IFtdXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5Db2xzOyBpKyspIHtcbiAgICAgIGNvbnN0IGNvbHVtbiA9IGV4YW1wbGVzLmZpbHRlcigoZSwgaW5kZXgpID0+IHtcbiAgICAgICAgcmV0dXJuIGluZGV4ICUgbkNvbHMgPT09IGlcbiAgICAgIH0pXG5cbiAgICAgIGNvbHVtbnMucHVzaChjb2x1bW4pXG4gICAgfVxuXG4gICAgbGV0IGNsYXNzTmFtZXMgPSBbc3R5bGVzLkV4YW1wbGVMaXN0XVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzLmpvaW4oJyAnKX0+XG4gICAgICAgIHtjb2x1bW5zLm1hcCgoY29sdW1uLCBpKSA9PlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLkV4YW1wbGVMaXN0X19jb2x1bW59PlxuICAgICAgICAgICAge2NvbHVtbi5tYXAoKGV4YW1wbGUsIGopID0+XG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBrZXk9e2p9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuRXhhbXBsZUxpc3RfX2V4YW1wbGV9PlxuICAgICAgICAgICAgICAgIDxFeGFtcGxlXG4gICAgICAgICAgICAgICAgICBjb21wYWN0PXtuQ29scyA+IDV9XG4gICAgICAgICAgICAgICAgICBleGFtcGxlPXtleGFtcGxlfSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9PC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRXhhbXBsZUxpc3RcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jb21wb25lbnRzL0V4YW1wbGVMaXN0L0V4YW1wbGVMaXN0LmpzeFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcIkV4YW1wbGVMaXN0XCI6XCJFeGFtcGxlTGlzdF9fRXhhbXBsZUxpc3RfX183NEpjM1wiLFwiRXhhbXBsZUxpc3RfX2NvbHVtblwiOlwiRXhhbXBsZUxpc3RfX0V4YW1wbGVMaXN0X19jb2x1bW5fX18zRnprV1wiLFwiRXhhbXBsZUxpc3RfX2V4YW1wbGVcIjpcIkV4YW1wbGVMaXN0X19FeGFtcGxlTGlzdF9fZXhhbXBsZV9fXzNlakxfXCJ9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9FeGFtcGxlTGlzdC9FeGFtcGxlTGlzdC5jc3NcbiAqKiBtb2R1bGUgaWQgPSA1MDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnXG5cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9FeGFtcGxlLmNzcydcbmltcG9ydCB7dG9nZ2xlSGlnaGxpZ2h0UXVlcnl9IGZyb20gJy4uLy4uL3N0b3JlL3VpQWN0aW9ucydcblxuY29uc3QgRXhhbXBsZSA9ICh7XG4gIGV4YW1wbGUsXG4gIGNvbXBhY3QsXG4gIGNvbG9yLFxuICBmb2N1c2VkUXVlcmllcyxcbiAgaGlnaGxpZ2h0ZWRRdWVyeSxcbiAgaGlnaGxpZ2h0UXVlcnlcbn0pID0+IHtcbiAgbGV0IHN0eWxlID0ge31cbiAgbGV0IGNsYXNzTmFtZXMgPSBbc3R5bGVzLkV4YW1wbGVdXG4gIGlmIChjb21wYWN0KSB7XG4gICAgY2xhc3NOYW1lcy5wdXNoKHN0eWxlcy5FeGFtcGxlX2NvbXBhY3QpXG4gIH1cbiAgaWYgKGZvY3VzZWRRdWVyaWVzLmxlbmd0aCA+IDEgJiYgaGlnaGxpZ2h0ZWRRdWVyeSA9PT0gZXhhbXBsZS5xdWVyeSkge1xuICAgIHN0eWxlLmJhY2tncm91bmRDb2xvciA9IGByZ2JhKCR7Y29sb3Iuc2xpY2UoNCwgY29sb3IubGVuZ3RoIC0gMSl9LCAwLjMpYFxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBvbk1vdXNlRW50ZXI9e2hpZ2hsaWdodFF1ZXJ5fVxuICAgICAgb25Nb3VzZUxlYXZlPXtoaWdobGlnaHRRdWVyeX1cbiAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5qb2luKCcgJyl9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5FeGFtcGxlX19pbWFnZVdyYXBwZXJ9PlxuICAgICAgICA8aW1nXG4gICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuRXhhbXBsZV9faW1hZ2V9XG4gICAgICAgICAgc3JjPXtleGFtcGxlLmV4YW1wbGUuc3JjfSAvPlxuICAgICAgPC9kaXY+XG4gICAgICBcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuRXhhbXBsZV9fZGVzY3JpcHRpb259PlxuICAgICAgICB7ZXhhbXBsZS5pbWFnZURlc2NyaXB0aW9ufVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcbiAgKHN0YXRlLCBvd25Qcm9wcykgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBmb2N1c2VkUXVlcmllczogc3RhdGUudWkuZm9jdXNlZFF1ZXJpZXMsXG4gICAgICBoaWdobGlnaHRlZFF1ZXJ5OiBzdGF0ZS51aS5oaWdobGlnaHRlZFF1ZXJ5LFxuICAgICAgY29sb3I6IHN0YXRlLmRhdGEucXVlcmllcy5maWx0ZXIocSA9PiBxLnF1ZXJ5ID09PSBvd25Qcm9wcy5leGFtcGxlLnF1ZXJ5KVswXS5jb2xvclxuICAgIH1cbiAgfSxcbiAgKGRpc3BhdGNoLCBvd25Qcm9wcykgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBoaWdobGlnaHRRdWVyeTogKCkgPT4ge1xuICAgICAgICBjb25zdCB7cXVlcnl9ID0gb3duUHJvcHMuZXhhbXBsZVxuXG4gICAgICAgIGRpc3BhdGNoKHRvZ2dsZUhpZ2hsaWdodFF1ZXJ5KHF1ZXJ5KSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbikoRXhhbXBsZSlcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jb21wb25lbnRzL0V4YW1wbGUvRXhhbXBsZS5qc3hcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJFeGFtcGxlXCI6XCJFeGFtcGxlX19FeGFtcGxlX19fMjdTMGlcIixcIkV4YW1wbGVfX2ltYWdlV3JhcHBlclwiOlwiRXhhbXBsZV9fRXhhbXBsZV9faW1hZ2VXcmFwcGVyX19fMUwtejVcIixcIkV4YW1wbGVfX2ltYWdlXCI6XCJFeGFtcGxlX19FeGFtcGxlX19pbWFnZV9fXzNZZDYxXCIsXCJFeGFtcGxlX19kZXNjcmlwdGlvblwiOlwiRXhhbXBsZV9fRXhhbXBsZV9fZGVzY3JpcHRpb25fX18xUldoclwiLFwiRXhhbXBsZV9jb21wYWN0XCI6XCJFeGFtcGxlX19FeGFtcGxlX2NvbXBhY3RfX18ya1lmSlwifTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvRXhhbXBsZS9FeGFtcGxlLmNzc1xuICoqIG1vZHVsZSBpZCA9IDUxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL0tleXdvcmRWaWV3LmNzcydcbmltcG9ydCBFeGFtcGxlTGlzdCBmcm9tICcuLi9FeGFtcGxlTGlzdCdcbmltcG9ydCBLZXl3b3JkRXhhbXBsZUxpc3QgZnJvbSAnLi4vS2V5d29yZEV4YW1wbGVMaXN0J1xuXG5jb25zdCBLZXl3b3JkVmlldyA9ICh7XG4gIGZvY3VzZWRLZXl3b3JkcyxcbiAgZXhhbXBsZXNcbn0pID0+IHtcbiAgY29uc3QgZm9jdXNlZEtleXdvcmRzUmVnZXhwID0gbmV3IFJlZ0V4cChgKCR7Zm9jdXNlZEtleXdvcmRzLmpvaW4oJ3wnKX0pYClcbiAgY29uc3Qgbm9uS2V5d29yZEV4YW1wbGVzID0gZXhhbXBsZXMuZmlsdGVyKGUgPT4gIWZvY3VzZWRLZXl3b3Jkc1JlZ2V4cC50ZXN0KGUuaW1hZ2VEZXNjcmlwdGlvbikpXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLktleXdvcmRWaWV3fT5cbiAgICAgIHtmb2N1c2VkS2V5d29yZHMubWFwKChrLCBpbmRleCkgPT5cbiAgICAgICAgPEtleXdvcmRFeGFtcGxlTGlzdFxuICAgICAgICAgIGtleXdvcmQ9e2t9XG4gICAgICAgICAgZXhhbXBsZXM9e2V4YW1wbGVzfSAvPlxuICAgICAgKX1cblxuICAgICAgPEV4YW1wbGVMaXN0XG4gICAgICAgIG5Db2xzPXs4fVxuICAgICAgICBleGFtcGxlcz17bm9uS2V5d29yZEV4YW1wbGVzfSAvPlxuICAgIDwvZGl2PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXG4gIHN0YXRlID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgZXhhbXBsZXM6IHN0YXRlLmRhdGEuZXhhbXBsZXMsXG4gICAgICBmb2N1c2VkS2V5d29yZHM6IHN0YXRlLnVpLmZvY3VzZWRLZXl3b3Jkc1xuICAgIH1cbiAgfVxuKShLZXl3b3JkVmlldylcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jb21wb25lbnRzL0tleXdvcmRWaWV3L0tleXdvcmRWaWV3LmpzeFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcIktleXdvcmRWaWV3XCI6XCJLZXl3b3JkVmlld19fS2V5d29yZFZpZXdfX18yM09JRVwifTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvS2V5d29yZFZpZXcvS2V5d29yZFZpZXcuY3NzXG4gKiogbW9kdWxlIGlkID0gNTEzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4J1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vUXVlcnlWaWV3LmNzcydcbmltcG9ydCBFeGFtcGxlTGlzdCBmcm9tICcuLi9FeGFtcGxlTGlzdCdcbmltcG9ydCBLZXl3b3JkRXhhbXBsZUxpc3QgZnJvbSAnLi4vS2V5d29yZEV4YW1wbGVMaXN0J1xuaW1wb3J0IEJsb2NrIGZyb20gJy4uLy4uL2xheW91dHMvQmxvY2snXG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vVGl0bGUnXG5cbmNvbnN0IFF1ZXJ5VmlldyA9ICh7XG4gIGRpcmVjdEV4YW1wbGVzLFxuICByZWxhdGVkRXhhbXBsZXMsXG4gIGZvY3VzZWRLZXl3b3Jkc1xufSkgPT4ge1xuICBjb25zdCBmb2N1c2VkS2V5d29yZHNSZWdleHAgPSBuZXcgUmVnRXhwKGAoJHtmb2N1c2VkS2V5d29yZHMuam9pbignfCcpfSlgKVxuXG4gIGNvbnN0IG5vbktleXdvcmREaXJlY3RFeGFtcGxlcyA9IGRpcmVjdEV4YW1wbGVzLmZpbHRlcihlID0+ICFmb2N1c2VkS2V5d29yZHMubGVuZ3RoIHx8ICFmb2N1c2VkS2V5d29yZHNSZWdleHAudGVzdChlLmltYWdlRGVzY3JpcHRpb24pKVxuICBsZXQgZGlyZWN0RXhhbXBsZXNFbCA9ICcnXG4gIGlmIChub25LZXl3b3JkRGlyZWN0RXhhbXBsZXMubGVuZ3RoKSB7XG4gICAgZGlyZWN0RXhhbXBsZXNFbCA9IChcbiAgICAgIDxFeGFtcGxlTGlzdFxuICAgICAgICBuQ29scz17OH1cbiAgICAgICAgZXhhbXBsZXM9e25vbktleXdvcmREaXJlY3RFeGFtcGxlc30gLz5cbiAgICApXG4gIH1cblxuICBjb25zdCBub25LZXl3b3JkUmVsYXRlZEV4YW1wbGVzID0gcmVsYXRlZEV4YW1wbGVzLmZpbHRlcihlID0+ICFmb2N1c2VkS2V5d29yZHMubGVuZ3RoIHx8ICFmb2N1c2VkS2V5d29yZHNSZWdleHAudGVzdChlLmltYWdlRGVzY3JpcHRpb24pKVxuICBsZXQgcmVsYXRlZEV4YW1wbGVzRWwgPSAnJ1xuICBpZiAobm9uS2V5d29yZERpcmVjdEV4YW1wbGVzLmxlbmd0aCkge1xuICAgIHJlbGF0ZWRFeGFtcGxlc0VsID0gKFxuICAgICAgPEV4YW1wbGVMaXN0XG4gICAgICAgIG5Db2xzPXs4fVxuICAgICAgICBleGFtcGxlcz17bm9uS2V5d29yZFJlbGF0ZWRFeGFtcGxlc30gLz5cbiAgICApXG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuUXVlcnlWaWV3fT5cbiAgICAgIDxCbG9jaz5cbiAgICAgICAgPEJsb2NrPlxuICAgICAgICAgIDxUaXRsZSB0aXRsZT1cIkNvbGVjdGVkIGJ5IGJyb3dzaW5nIHNlYXJjaCByZXN1bHRzXCIgLz5cbiAgICAgICAgPC9CbG9jaz5cblxuICAgICAgICB7Zm9jdXNlZEtleXdvcmRzLm1hcCgoaywgaW5kZXgpID0+XG4gICAgICAgICAgPEtleXdvcmRFeGFtcGxlTGlzdFxuICAgICAgICAgICAga2V5d29yZD17a31cbiAgICAgICAgICAgIGV4YW1wbGVzPXtkaXJlY3RFeGFtcGxlc30gLz5cbiAgICAgICAgKX1cblxuICAgICAgICB7ZGlyZWN0RXhhbXBsZXNFbH1cbiAgICAgIDwvQmxvY2s+XG5cbiAgICAgIDxCbG9jaz5cbiAgICAgICAgPFRpdGxlIHRpdGxlPVwiQ29sZWN0ZWQgYnkgYnJvd3NpbmcgcmVsYXRlZCBpbWFnZXNcIiAvPlxuICAgICAgPC9CbG9jaz5cblxuICAgICAge2ZvY3VzZWRLZXl3b3Jkcy5tYXAoKGssIGluZGV4KSA9PlxuICAgICAgICA8S2V5d29yZEV4YW1wbGVMaXN0XG4gICAgICAgICAga2V5d29yZD17a31cbiAgICAgICAgICBleGFtcGxlcz17cmVsYXRlZEV4YW1wbGVzfSAvPlxuICAgICAgKX1cblxuICAgICAge3JlbGF0ZWRFeGFtcGxlc0VsfVxuICAgIDwvZGl2PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXG4gIHN0YXRlID0+IHtcbiAgICBjb25zdCBleGFtcGxlcyA9IHN0YXRlLmRhdGEuZXhhbXBsZXMuZmlsdGVyKGUgPT4ge1xuICAgICAgcmV0dXJuIHN0YXRlLnVpLmZvY3VzZWRRdWVyaWVzLmluZGV4T2YoZS5xdWVyeSkgIT09IC0xXG4gICAgfSlcblxuICAgIHJldHVybiB7XG4gICAgICBmb2N1c2VkS2V5d29yZHM6IHN0YXRlLnVpLmZvY3VzZWRLZXl3b3JkcyxcbiAgICAgIGRpcmVjdEV4YW1wbGVzOiBleGFtcGxlc1xuICAgICAgICAuZmlsdGVyKGUgPT4gZS5yZWxldmFuY2UgPiAwKVxuICAgICAgICAuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgIGlmIChhLnF1ZXJ5ID4gYi5xdWVyeSkge1xuICAgICAgICAgICAgcmV0dXJuIDFcbiAgICAgICAgICB9IGVsc2UgaWYgKGEucXVlcnkgPCBiLnF1ZXJ5KSB7XG4gICAgICAgICAgICByZXR1cm4gLTFcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGEuY3JlYXRlZEF0ID4gYi5jcmVhdGVkQXQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDFcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiAtMVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICByZWxhdGVkRXhhbXBsZXM6IGV4YW1wbGVzXG4gICAgICAgIC5maWx0ZXIoZSA9PiBlLnJlbGV2YW5jZSA9PT0gLTEpXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgaWYgKGEucXVlcnkgPiBiLnF1ZXJ5KSB7XG4gICAgICAgICAgICByZXR1cm4gMVxuICAgICAgICAgIH0gZWxzZSBpZiAoYS5xdWVyeSA8IGIucXVlcnkpIHtcbiAgICAgICAgICAgIHJldHVybiAtMVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoYS5jcmVhdGVkQXQgPiBiLmNyZWF0ZWRBdCkge1xuICAgICAgICAgICAgICByZXR1cm4gMVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIC0xXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbiAgfVxuKShRdWVyeVZpZXcpXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvY29tcG9uZW50cy9RdWVyeVZpZXcvUXVlcnlWaWV3LmpzeFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcIlF1ZXJ5Vmlld1wiOlwiUXVlcnlWaWV3X19RdWVyeVZpZXdfX18zYW9uelwifTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvUXVlcnlWaWV3L1F1ZXJ5Vmlldy5jc3NcbiAqKiBtb2R1bGUgaWQgPSA1MTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL0tleXdvcmRFeGFtcGxlTGlzdC5jc3MnXG5pbXBvcnQgRXhhbXBsZUxpc3QgZnJvbSAnLi4vRXhhbXBsZUxpc3QnXG5pbXBvcnQgQmxvY2sgZnJvbSAnLi4vLi4vbGF5b3V0cy9CbG9jaydcblxuY29uc3QgS2V5d29yZEV4YW1wbGVMaXN0ID0gKHtcbiAga2V5d29yZCxcbiAgZXhhbXBsZXNcbn0pID0+IHtcbiAgY29uc3QgZmlsdGVyZWRFeGFtcGxlcyA9IGV4YW1wbGVzLmZpbHRlcihlID0+IGUuaW1hZ2VEZXNjcmlwdGlvbi5pbmRleE9mKGtleXdvcmQpICE9PSAtMSlcblxuICBpZiAoZmlsdGVyZWRFeGFtcGxlcy5sZW5ndGgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEJsb2NrPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAga2V5PXtrZXl3b3JkfVxuICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLktleXdvcmRFeGFtcGxlTGlzdH0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5LZXl3b3JkRXhhbXBsZUxpc3RfX2tleXdvcmR9PntrZXl3b3JkfTwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5LZXl3b3JkRXhhbXBsZUxpc3RfX2V4YW1wbGVzfT5cbiAgICAgICAgICAgIDxFeGFtcGxlTGlzdFxuICAgICAgICAgICAgICBuQ29scz17N31cbiAgICAgICAgICAgICAgZXhhbXBsZXM9e2ZpbHRlcmVkRXhhbXBsZXN9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9CbG9jaz5cbiAgICApXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICcnXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgS2V5d29yZEV4YW1wbGVMaXN0XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvY29tcG9uZW50cy9LZXl3b3JkRXhhbXBsZUxpc3QvS2V5d29yZEV4YW1wbGVMaXN0LmpzeFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcIktleXdvcmRFeGFtcGxlTGlzdFwiOlwiS2V5d29yZEV4YW1wbGVMaXN0X19LZXl3b3JkRXhhbXBsZUxpc3RfX18xRV8xMVwiLFwiS2V5d29yZEV4YW1wbGVMaXN0X19rZXl3b3JkXCI6XCJLZXl3b3JkRXhhbXBsZUxpc3RfX0tleXdvcmRFeGFtcGxlTGlzdF9fa2V5d29yZF9fXzNtdjdOXCIsXCJLZXl3b3JkRXhhbXBsZUxpc3RfX2V4YW1wbGVzXCI6XCJLZXl3b3JkRXhhbXBsZUxpc3RfX0tleXdvcmRFeGFtcGxlTGlzdF9fZXhhbXBsZXNfX18yUWJmcVwifTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvS2V5d29yZEV4YW1wbGVMaXN0L0tleXdvcmRFeGFtcGxlTGlzdC5jc3NcbiAqKiBtb2R1bGUgaWQgPSA1MTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuY29uc3QgYmFzZWxpbmUgPSAwLjc1MFxuXG5jb25zdCBCbG9jayA9ICh7XG4gIG4gPSAxLFxuICBleHRyYUNsYXNzTmFtZXMgPSAnJyxcbiAgY2hpbGRyZW5cbn0pID0+IHtcbiAgY29uc3Qgc3R5bGUgPSB7XG4gICAgbWFyZ2luQm90dG9tOiBgJHtiYXNlbGluZSAqIG59cmVtYFxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IHN0eWxlPXtzdHlsZX0gY2xhc3NOYW1lPXtleHRyYUNsYXNzTmFtZXN9PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvZGl2PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IEJsb2NrXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvbGF5b3V0cy9CbG9jay9CbG9jay5qc3hcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9UaXRsZS5jc3MnXG5cbmNvbnN0IFRpdGxlID0gKHtcbiAgdGl0bGVcbn0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLlRpdGxlfT5cbiAgICAgIHt0aXRsZX1cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBUaXRsZVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2NvbXBvbmVudHMvVGl0bGUvVGl0bGUuanN4XG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiVGl0bGVcIjpcIlRpdGxlX19UaXRsZV9fXzE3QnVLXCJ9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9UaXRsZS9UaXRsZS5jc3NcbiAqKiBtb2R1bGUgaWQgPSA1MjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBpbyBmcm9tICdzb2NrZXQuaW8tY2xpZW50J1xuXG5jb25zdCBzb2NrZXQgPSBpbygnaHR0cHM6Ly92ZHppdWJhay5jb20vJywge3BhdGg6ICcvZGVzaWduRml4YXRpb25TZXJ2ZXInfSlcblxuZXhwb3J0IGRlZmF1bHQgc29ja2V0XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvc3RvcmUvc29ja2V0LmpzXG4gKiovIiwiaW1wb3J0IHJhbmRvbWNvbG9yIGZyb20gJ3JhbmRvbWNvbG9yJ1xuaW1wb3J0IGFsZ29saWFzZWFyY2ggZnJvbSAnYWxnb2xpYXNlYXJjaCdcblxuY29uc3QgY2xpZW50ID0gYWxnb2xpYXNlYXJjaCgnNzRTMUpOQjFaVCcsICczZGU2ZmRiYWZjNDc3Y2YwMTk2NzNiYjgxMDQzYWUwZCcpXG5jb25zdCBpbmRleCA9IGNsaWVudC5pbml0SW5kZXgoJ0Rlc2lnbkZpeGF0aW9uU3R1ZHlUYXNrcycpXG5cbmV4cG9ydCBjb25zdCBSRUNFSVZFX0RBVEEgPSAnUkVDRUlWRV9EQVRBJ1xuZXhwb3J0IGNvbnN0IFJFQ0VJVkVfUVVFUllfVEFTSyA9ICdSRUNFSVZFX1FVRVJZX1RBU0snXG5leHBvcnQgY29uc3QgUkVDRUlWRV9FWEFNUExFID0gJ1JFQ0VJVkVfRVhBTVBMRSdcbmV4cG9ydCBjb25zdCBSRUNFSVZFX1FVRVJZID0gJ1JFQ0VJVkVfUVVFUlknXG5leHBvcnQgY29uc3QgSU5DX0VYQU1QTEVfQ09VTlRFUiA9ICdJTkNfRVhBTVBMRV9DT1VOVEVSJ1xuXG5leHBvcnQgY29uc3QgcmVjZWl2ZUV4YW1wbGUgPSAoZXhhbXBsZSkgPT4ge1xuICByZXR1cm4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGV4YW1wbGUpXG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogSU5DX0VYQU1QTEVfQ09VTlRFUixcbiAgICAgIHF1ZXJ5OiBleGFtcGxlLnF1ZXJ5XG4gICAgfSlcblxuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFJFQ0VJVkVfRVhBTVBMRSxcbiAgICAgIGV4YW1wbGVcbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCByZWNlaXZlUXVlcnkgPSAocXVlcnkpID0+IHtcbiAgcmV0dXJuIGRpc3BhdGNoID0+IHtcbiAgICBjb25zb2xlLmxvZyhxdWVyeSlcbiAgICBjb25zdCBjb2xvciA9IHJhbmRvbWNvbG9yKHtcbiAgICAgIGx1bWlub3NpdHk6ICdicmlnaHQnLFxuICAgICAgZm9ybWF0OiAncmdiJ1xuICAgIH0pXG5cbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBSRUNFSVZFX1FVRVJZLFxuICAgICAgcXVlcnk6IE9iamVjdC5hc3NpZ24oe30sIHF1ZXJ5LCB7XG4gICAgICAgIGV4YW1wbGVzQ291bnQ6IDAsXG4gICAgICAgIGNvbG9yXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHJlY2VpdmVEYXRhID0gKHF1ZXJpZXMsIGV4YW1wbGVzLCB0YXNrKSA9PiB7XG4gIHJldHVybiBkaXNwYXRjaCA9PiB7XG4gICAgY29uc3QgY29sb3JzID0gcmFuZG9tY29sb3Ioe1xuICAgICAgY291bnQ6IHF1ZXJpZXMubGVuZ3RoLFxuICAgICAgbHVtaW5vc2l0eTogJ2JyaWdodCcsXG4gICAgICBmb3JtYXQ6ICdyZ2InXG4gICAgfSlcblxuICAgIGNvbnN0IGVuaGFuY2VkUXVlcmllcyA9IHF1ZXJpZXMubWFwKChxLCBpbmRleCkgPT4gT2JqZWN0LmFzc2lnbih7fSwgcSwge1xuICAgICAgZXhhbXBsZXNDb3VudDogZXhhbXBsZXMuZmlsdGVyKGUgPT4gZS5xdWVyeSA9PT0gcS5xdWVyeSkubGVuZ3RoLFxuICAgICAgY29sb3I6IGNvbG9yc1tpbmRleF1cbiAgICB9KSlcblxuICAgIC8vIGZvciAobGV0IHF1ZXJ5IG9mIHF1ZXJpZXMpIHtcbiAgICAvLyAgIGluZGV4LnNlYXJjaChxdWVyeS5xdWVyeSwgKGVyciwgY29udGVudCkgPT4ge1xuICAgIC8vICAgICBpZiAoY29udGVudC5oaXRzLmxlbmd0aCkge1xuICAgIC8vICAgICAgIGNvbnN0IG1hdGNoZWRUYXNrID0gY29udGVudC5oaXRzLmZpbHRlcihoID0+IGgudGFza0FsaWFzID09PSB0YXNrLmFsaWFzKVswXVxuICAgIC8vXG4gICAgLy8gICAgICAgZGlzcGF0Y2goe1xuICAgIC8vICAgICAgICAgdHlwZTogUkVDRUlWRV9RVUVSWV9UQVNLLFxuICAgIC8vICAgICAgICAgbWF0Y2hlZFRhc2s6IG1hdGNoZWRUYXNrLl9oaWdobGlnaHRSZXN1bHQudGV4dC52YWx1ZSxcbiAgICAvLyAgICAgICAgIHF1ZXJ5OiBxdWVyeS5xdWVyeVxuICAgIC8vICAgICAgIH0pXG4gICAgLy8gICAgIH1cbiAgICAvLyAgIH0pXG4gICAgLy8gfVxuXG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogUkVDRUlWRV9EQVRBLFxuICAgICAgcXVlcmllczogZW5oYW5jZWRRdWVyaWVzLFxuICAgICAgZXhhbXBsZXMsXG4gICAgICB0YXNrXG4gICAgfSlcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL3N0b3JlL2RhdGFBY3Rpb25zLmpzXG4gKiovIiwiZXhwb3J0IGNvbnN0IFJFQ0VJVkVfU1RVRFkgPSAnUkVDRUlWRV9TVFVEWSdcblxuZXhwb3J0IGNvbnN0IHJlY2VpdmVTdHVkeSA9IChcbiAgcGFydGljaXBhbnRJZCxcbiAgc2Vzc2lvbklkLFxuICBjb25kaXRpb24sXG4gIHRhc2tBbGlhc1xuKSA9PiB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogUkVDRUlWRV9TVFVEWSxcbiAgICBwYXJ0aWNpcGFudElkLFxuICAgIHNlc3Npb25JZCxcbiAgICBjb25kaXRpb24sXG4gICAgdGFza0FsaWFzXG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9zdG9yZS9zdHVkeUFjdGlvbnMuanNcbiAqKi8iLCJpbXBvcnQge2NyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmV9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IGNyZWF0ZUxvZ2dlciBmcm9tICdyZWR1eC1sb2dnZXInXG5pbXBvcnQgdGh1bmtNaWRkbGV3YXJlIGZyb20gJ3JlZHV4LXRodW5rJ1xuaW1wb3J0IHJvb3RSZWR1Y2VyIGZyb20gJy4vcm9vdFJlZHVjZXInXG5cbmNvbnN0IG1pZGRsZXdhcmUgPSBbdGh1bmtNaWRkbGV3YXJlXVxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgY29uc3QgbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKClcbiAgbWlkZGxld2FyZS5wdXNoKGxvZ2dlcilcbn1cblxuY29uc3QgY29uZmlndXJlU3RvcmUgPSAoaW5pdGlhbFN0YXRlKSA9PiB7XG4gIHJldHVybiBjcmVhdGVTdG9yZShcbiAgICByb290UmVkdWNlcixcbiAgICBpbml0aWFsU3RhdGUsXG4gICAgYXBwbHlNaWRkbGV3YXJlKC4uLm1pZGRsZXdhcmUpXG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29uZmlndXJlU3RvcmVcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9zdG9yZS9zdG9yZS5qc1xuICoqLyIsImltcG9ydCB7Y29tYmluZVJlZHVjZXJzfSBmcm9tICdyZWR1eCdcbmltcG9ydCBkYXRhIGZyb20gJy4vZGF0YVJlZHVjZXInXG5pbXBvcnQgdWkgZnJvbSAnLi91aVJlZHVjZXInXG5pbXBvcnQgc3R1ZHkgZnJvbSAnLi9zdHVkeVJlZHVjZXInXG5cbmNvbnN0IHJvb3RSZWR1Y2VyID0gY29tYmluZVJlZHVjZXJzKHtcbiAgZGF0YSxcbiAgdWksXG4gIHN0dWR5XG59KVxuXG5leHBvcnQgZGVmYXVsdCByb290UmVkdWNlclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL3N0b3JlL3Jvb3RSZWR1Y2VyLmpzXG4gKiovIiwiaW1wb3J0IHtSRUNFSVZFX0RBVEEsIFJFQ0VJVkVfUVVFUllfVEFTSywgUkVDRUlWRV9FWEFNUExFLCBSRUNFSVZFX1FVRVJZLCBJTkNfRVhBTVBMRV9DT1VOVEVSfSBmcm9tICcuL2RhdGFBY3Rpb25zJ1xuaW1wb3J0IGluaXRpYWxTdGF0ZSBmcm9tICcuL2luaXRpYWxTdGF0ZSdcblxuY29uc3QgZGF0YSA9IChcbiAgc3RhdGUgPSBpbml0aWFsU3RhdGUuZGF0YSxcbiAgYWN0aW9uXG4pID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgUkVDRUlWRV9EQVRBOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHF1ZXJpZXM6IGFjdGlvbi5xdWVyaWVzLFxuICAgICAgICBleGFtcGxlczogYWN0aW9uLmV4YW1wbGVzLFxuICAgICAgICB0YXNrOiBhY3Rpb24udGFza1xuICAgICAgfSlcbiAgICBjYXNlIFJFQ0VJVkVfRVhBTVBMRTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBleGFtcGxlczogW1xuICAgICAgICAgIC4uLnN0YXRlLmV4YW1wbGVzLFxuICAgICAgICAgIGFjdGlvbi5leGFtcGxlXG4gICAgICAgIF1cbiAgICAgIH0pXG4gICAgY2FzZSBSRUNFSVZFX1FVRVJZOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHF1ZXJpZXM6IFtcbiAgICAgICAgICAuLi5zdGF0ZS5xdWVyaWVzLFxuICAgICAgICAgIGFjdGlvbi5xdWVyeVxuICAgICAgICBdXG4gICAgICB9KVxuICAgIGNhc2UgSU5DX0VYQU1QTEVfQ09VTlRFUjpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBxdWVyaWVzOiBzdGF0ZS5xdWVyaWVzLm1hcChxID0+IHtcbiAgICAgICAgICBpZiAocS5xdWVyeSA9PT0gYWN0aW9uLnF1ZXJ5KSB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgcSwge1xuICAgICAgICAgICAgICBleGFtcGxlc0NvdW50OiBxLmV4YW1wbGVzQ291bnQgKyAxXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gcVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgY2FzZSBSRUNFSVZFX1FVRVJZX1RBU0s6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgcXVlcmllczogc3RhdGUucXVlcmllcy5tYXAocSA9PiB7XG4gICAgICAgICAgaWYgKHEucXVlcnkgPT09IGFjdGlvbi5xdWVyeSkge1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHEsIHtcbiAgICAgICAgICAgICAgbWF0Y2hlZFRhc2s6IGFjdGlvbi5tYXRjaGVkVGFza1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHFcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBkYXRhXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvc3RvcmUvZGF0YVJlZHVjZXIuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCB7XG4gIGRhdGE6IHtcbiAgICBxdWVyaWVzOiBbXSxcbiAgICBleGFtcGxlczogW10sXG4gICAgdGFzazoge31cbiAgfSxcbiAgdWk6IHtcbiAgICBoaWdobGlnaHRlZFF1ZXJ5OiBudWxsLFxuICAgIGZvY3VzZWRRdWVyaWVzOiBbXSxcbiAgICBmb2N1c2VkS2V5d29yZHM6IFtdXG4gIH0sXG4gIHN0dWR5OiB7XG4gICAgcGFydGljaXBhbnRJZDogJ3Rlc3QnLFxuICAgIHNlc3Npb25JZDogJ3Rlc3QnLFxuICAgIGNvbmRpdGlvbjogJ3N5c3RlbScsXG4gICAgdGFza0FsaWFzOiAnY2FycydcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL3N0b3JlL2luaXRpYWxTdGF0ZS5qc1xuICoqLyIsImltcG9ydCB7VE9HR0xFX0hJR0hMSUdIVF9RVUVSWSwgVE9HR0xFX0ZPQ1VTX1FVRVJZLCBUT0dHTEVfRk9DVVNfS0VZV09SRH0gZnJvbSAnLi91aUFjdGlvbnMnXG5pbXBvcnQgaW5pdGlhbFN0YXRlIGZyb20gJy4vaW5pdGlhbFN0YXRlJ1xuXG5jb25zdCB1aSA9IChcbiAgc3RhdGUgPSBpbml0aWFsU3RhdGUudWksXG4gIGFjdGlvblxuKSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIFRPR0dMRV9ISUdITElHSFRfUVVFUlk6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgaGlnaGxpZ2h0ZWRRdWVyeTogYWN0aW9uLnF1ZXJ5ID09PSBzdGF0ZS5oaWdobGlnaHRlZFF1ZXJ5ID8gbnVsbCA6IGFjdGlvbi5xdWVyeVxuICAgICAgfSlcbiAgICBjYXNlIFRPR0dMRV9GT0NVU19RVUVSWTpcbiAgICAgIGNvbnN0IHRhcmdldFF1ZXJ5SW5kZXggPSBzdGF0ZS5mb2N1c2VkUXVlcmllcy5pbmRleE9mKGFjdGlvbi5xdWVyeSlcbiAgICAgIGxldCBmb2N1c2VkUXVlcmllcyA9IFtdXG4gICAgICBpZiAodGFyZ2V0UXVlcnlJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgZm9jdXNlZFF1ZXJpZXMgPSBbXG4gICAgICAgICAgLi4uc3RhdGUuZm9jdXNlZFF1ZXJpZXMsXG4gICAgICAgICAgYWN0aW9uLnF1ZXJ5XG4gICAgICAgIF1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvY3VzZWRRdWVyaWVzID0gW1xuICAgICAgICAgIC4uLnN0YXRlLmZvY3VzZWRRdWVyaWVzLnNsaWNlKDAsIHRhcmdldFF1ZXJ5SW5kZXgpLFxuICAgICAgICAgIC4uLnN0YXRlLmZvY3VzZWRRdWVyaWVzLnNsaWNlKHRhcmdldFF1ZXJ5SW5kZXggKyAxKVxuICAgICAgICBdXG4gICAgICB9XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgZm9jdXNlZFF1ZXJpZXNcbiAgICAgIH0pXG4gICAgY2FzZSBUT0dHTEVfRk9DVVNfS0VZV09SRDpcbiAgICAgIGNvbnN0IHRhcmdldEtleXdvcmRJbmRleCA9IHN0YXRlLmZvY3VzZWRLZXl3b3Jkcy5pbmRleE9mKGFjdGlvbi5rZXl3b3JkKVxuICAgICAgbGV0IGZvY3VzZWRLZXl3b3JkcyA9IFtdXG4gICAgICBpZiAodGFyZ2V0S2V5d29yZEluZGV4ID09PSAtMSkge1xuICAgICAgICBmb2N1c2VkS2V5d29yZHMgPSBbXG4gICAgICAgICAgLi4uc3RhdGUuZm9jdXNlZEtleXdvcmRzLFxuICAgICAgICAgIGFjdGlvbi5rZXl3b3JkXG4gICAgICAgIF1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvY3VzZWRLZXl3b3JkcyA9IFtcbiAgICAgICAgICAuLi5zdGF0ZS5mb2N1c2VkS2V5d29yZHMuc2xpY2UoMCwgdGFyZ2V0S2V5d29yZEluZGV4KSxcbiAgICAgICAgICAuLi5zdGF0ZS5mb2N1c2VkS2V5d29yZHMuc2xpY2UodGFyZ2V0S2V5d29yZEluZGV4ICsgMSlcbiAgICAgICAgXVxuICAgICAgfVxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGZvY3VzZWRLZXl3b3Jkc1xuICAgICAgfSlcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgdWlcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9zdG9yZS91aVJlZHVjZXIuanNcbiAqKi8iLCJpbXBvcnQge1JFQ0VJVkVfU1RVRFl9IGZyb20gJy4vc3R1ZHlBY3Rpb25zJ1xuaW1wb3J0IGluaXRpYWxTdGF0ZSBmcm9tICcuL2luaXRpYWxTdGF0ZSdcblxuY29uc3Qgc3R1ZHkgPSAoXG4gIHN0YXRlID0gaW5pdGlhbFN0YXRlLnN0dWR5LFxuICBhY3Rpb25cbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBSRUNFSVZFX1NUVURZOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHBhcnRpY2lwYW50SWQ6IGFjdGlvbi5wYXJ0aWNpcGFudElkLFxuICAgICAgICBzZXNzaW9uSWQ6IGFjdGlvbi5zZXNzaW9uSWQsXG4gICAgICAgIGNvbmRpdGlvbjogYWN0aW9uLmNvbmRpdGlvbixcbiAgICAgICAgdGFza0FsaWFzOiBhY3Rpb24udGFza0FsaWFzXG4gICAgICB9KVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBzdHVkeVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL3N0b3JlL3N0dWR5UmVkdWNlci5qc1xuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9zdHlsZXMvcmVzZXQuY3NzXG4gKiogbW9kdWxlIGlkID0gNjEzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQURBOzs7Ozs7Ozs7Ozs7Ozs7QUNiQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTtBQUFBO0FBQ0E7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7OztBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFHQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBSUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUlBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBSUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQXJCQTtBQTBCQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBM0JBO0FBZ0NBOzs7O0FBM0VBO0FBQ0E7QUE2RUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTs7Ozs7OztBQ3RHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBQ0E7QUFHQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFJQTtBQUxBO0FBUUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUZBO0FBSUE7Ozs7Ozs7QUMvQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBSEE7QUFEQTtBQVFBOzs7O0FBYkE7QUFDQTtBQWVBO0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFEQTtBQUdBOzs7Ozs7O0FDM0JBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNEQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQ0E7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUlBO0FBSkE7QUFBQTtBQU9BO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBOzs7Ozs7O0FDM0NBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2QkE7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBSEE7QUFEQTtBQVFBOzs7O0FBYkE7QUFDQTtBQWVBO0FBRUE7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFWQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBV0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBdkJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQXdCQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFEQTtBQUdBOzs7Ozs7O0FDckRBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNEQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQ0E7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUdBO0FBSEE7QUFBQTtBQU1BO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBOzs7Ozs7O0FDeENBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNEQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQUNBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQVNBOzs7Ozs7Ozs7Ozs7Ozs7QUMxQkE7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBQ0E7QUFHQTtBQUFBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQURBO0FBSEE7QUFEQTtBQURBO0FBaUJBOzs7O0FBakNBO0FBQ0E7QUFtQ0E7Ozs7Ozs7QUN6Q0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ0RBO0FBQ0E7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFDQTtBQU9BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQU1BO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFYQTtBQWdCQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFIQTtBQUtBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQU9BOzs7Ozs7O0FDMURBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNEQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFDQTtBQUdBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUhBO0FBTUE7QUFDQTtBQUNBO0FBVEE7QUFZQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFGQTtBQUlBOzs7Ozs7O0FDbkNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNEQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFDQTtBQUlBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBSUE7QUFBQTtBQUVBO0FBQ0E7QUFIQTtBQU1BO0FBWEE7QUFjQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBSUE7QUFBQTtBQUVBO0FBQ0E7QUFIQTtBQU1BO0FBekJBO0FBNEJBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQS9CQTtBQWlDQTs7Ozs7OztBQzFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFDQTtBQUdBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBTEE7QUFEQTtBQWNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDaENBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNEQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUlBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDbkJBO0FBQ0E7OztBQUNBO0FBQ0E7Ozs7O0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUlBO0FBQ0E7Ozs7Ozs7O0FDYkE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ0RBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNIQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFGQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFLQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFGQTtBQUFBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7Ozs7Ozs7Ozs7Ozs7QUM5RUE7QUFDQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFPQTs7Ozs7Ozs7Ozs7OztBQ2ZBO0FBQ0E7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDbkJBO0FBQ0E7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQUtBOzs7Ozs7Ozs7Ozs7Ozs7QUNYQTtBQUNBO0FBQUE7QUFDQTs7Ozs7OztBQUNBO0FBR0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFEQTtBQU1BO0FBQ0E7QUFDQTtBQURBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBV0E7QUFDQTtBQTlDQTtBQWdEQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFYQTs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUFBO0FBQ0E7Ozs7Ozs7QUFDQTtBQUdBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUF4Q0E7QUEwQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2xEQTtBQUNBO0FBQUE7QUFDQTs7Ozs7QUFDQTtBQUdBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBVEE7QUFXQTtBQUNBOzs7Ozs7OztBQ25CQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=