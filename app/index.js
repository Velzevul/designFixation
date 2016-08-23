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

	var _store = __webpack_require__(597);

	var _store2 = _interopRequireDefault(_store);

	var _reactRedux = __webpack_require__(472);

	__webpack_require__(605);

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

	var _QueryList = __webpack_require__(501);

	var _QueryList2 = _interopRequireDefault(_QueryList);

	var _CollectionView = __webpack_require__(506);

	var _CollectionView2 = _interopRequireDefault(_CollectionView);

	var _QueryView = __webpack_require__(511);

	var _QueryView2 = _interopRequireDefault(_QueryView);

	var _socket = __webpack_require__(513);

	var _socket2 = _interopRequireDefault(_socket);

	var _dataActions = __webpack_require__(562);

	var _studyActions = __webpack_require__(596);

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
	      var focusedQueries = this.props.focusedQueries;


	      var bodyEl = '';
	      if (focusedQueries.length > 0) {
	        bodyEl = _react2.default.createElement(_QueryView2.default, null);
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
	            { className: _App2.default.AppSidebar__header },
	            _react2.default.createElement(_TaskDescription2.default, null)
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: _App2.default.AppSidebar__body },
	            _react2.default.createElement(_QueryList2.default, null)
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
	    focusedQueries: state.ui.focusedQueries
	  };
		})(App);

/***/ },

/***/ 495:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"App":"App__App___lBEXI","App__main":"App__App__main___2VZji","AppSidebar":"App__AppSidebar___wXvF4","AppSidebar__header":"App__AppSidebar__header___2WtqC","AppSidebar__body":"App__AppSidebar__body___ZdyV_"};

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

	var _Title = __webpack_require__(498);

	var _Title2 = _interopRequireDefault(_Title);

	var _Block = __webpack_require__(500);

	var _Block2 = _interopRequireDefault(_Block);

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
	      _Block2.default,
	      null,
	      _react2.default.createElement(_Title2.default, { title: 'Design Task' })
	    ),
	    _react2.default.createElement(
	      'div',
	      { className: _TaskDescription2.default.TaskDescription__body },
	      _react2.default.createElement(
	        'div',
	        { className: _TaskDescription2.default.TaskDescription__main },
	        task.text
	      ),
	      queryTasks
	    )
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
	module.exports = {"TaskDescription":"TaskDescription__TaskDescription___1tOK9","TaskDescription__body":"TaskDescription__TaskDescription__body___2iaQ7","TaskDescription__main":"TaskDescription__TaskDescription__main___M3NIN","TaskDescription__query":"TaskDescription__TaskDescription__query___1h2qO"};

/***/ },

/***/ 498:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _Title = __webpack_require__(499);

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

/***/ 499:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"Title":"Title__Title___17BuK"};

/***/ },

/***/ 500:
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

/***/ 501:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(472);

	var _QueryList = __webpack_require__(502);

	var _QueryList2 = _interopRequireDefault(_QueryList);

	var _Query = __webpack_require__(503);

	var _Query2 = _interopRequireDefault(_Query);

	var _Title = __webpack_require__(498);

	var _Title2 = _interopRequireDefault(_Title);

	var _Block = __webpack_require__(500);

	var _Block2 = _interopRequireDefault(_Block);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	        _react2.default.createElement(
	          _Block2.default,
	          null,
	          _react2.default.createElement(_Title2.default, { title: 'Searches' })
	        ),
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
	    queries: state.data.queries.sort(function (a, b) {
	      return b.examplesCount - a.examplesCount;
	    })
	  };
		})(QueryList);

/***/ },

/***/ 502:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"QueryList":"QueryList__QueryList___2HcgL"};

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

	var _Query = __webpack_require__(504);

	var _Query2 = _interopRequireDefault(_Query);

	var _uiActions = __webpack_require__(505);

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

/***/ 504:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"Query":"Query__Query___32yVP","Query_isFocused":"Query__Query_isFocused___3Yu6Z"};

/***/ },

/***/ 505:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var TOGGLE_HIGHLIGHT_QUERY = exports.TOGGLE_HIGHLIGHT_QUERY = 'TOGGLE_HIGHLIGHT_QUERY';
	var TOGGLE_FOCUS_QUERY = exports.TOGGLE_FOCUS_QUERY = 'TOGGLE_FOCUS_QUERY';

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

/***/ },

/***/ 506:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(472);

	var _ExampleList = __webpack_require__(507);

	var _ExampleList2 = _interopRequireDefault(_ExampleList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var CollectionView = function CollectionView(_ref) {
	  var examples = _ref.examples;

	  return _react2.default.createElement(_ExampleList2.default, { examples: examples });
	};

	exports.default = (0, _reactRedux.connect)(function (state) {
	  return {
	    examples: state.data.examples.sort(function (a, b) {
	      if (b.createdAt > a.createdAt) {
	        return -1;
	      } else if (a.createdAt >= b.createdAt) {
	        return 1;
	      }
	    })
	  };
		})(CollectionView);

/***/ },

/***/ 507:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _ExampleList = __webpack_require__(508);

	var _ExampleList2 = _interopRequireDefault(_ExampleList);

	var _Example = __webpack_require__(509);

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
	      var _props$compact = _props.compact;
	      var compact = _props$compact === undefined ? false : _props$compact;

	      var columns = [];
	      var nCols = compact ? 8 : 5;

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
	      if (compact) {
	        classNames.push(_ExampleList2.default.ExampleList_compact);
	      }

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
	                  compact: compact,
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

/***/ 508:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"ExampleList":"ExampleList__ExampleList___74Jc3","ExampleList__column":"ExampleList__ExampleList__column___3FzkW","ExampleList__example":"ExampleList__ExampleList__example___3ejL_","ExampleList_compact":"ExampleList__ExampleList_compact___f--cB"};

/***/ },

/***/ 509:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(298);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(472);

	var _Example = __webpack_require__(510);

	var _Example2 = _interopRequireDefault(_Example);

	var _uiActions = __webpack_require__(505);

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

/***/ 510:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"Example":"Example__Example___27S0i","Example__imageWrapper":"Example__Example__imageWrapper___1L-z5","Example__image":"Example__Example__image___3Yd61","Example__description":"Example__Example__description___1RWhr","Example_compact":"Example__Example_compact___2kYfJ"};

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

	var _QueryView = __webpack_require__(512);

	var _QueryView2 = _interopRequireDefault(_QueryView);

	var _ExampleList = __webpack_require__(507);

	var _ExampleList2 = _interopRequireDefault(_ExampleList);

	var _Block = __webpack_require__(500);

	var _Block2 = _interopRequireDefault(_Block);

	var _Title = __webpack_require__(498);

	var _Title2 = _interopRequireDefault(_Title);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var QueryView = function QueryView(_ref) {
	  var directExamples = _ref.directExamples;
	  var relatedExamples = _ref.relatedExamples;

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
	      _react2.default.createElement(_ExampleList2.default, {
	        compact: true,
	        examples: directExamples })
	    ),
	    _react2.default.createElement(
	      _Block2.default,
	      null,
	      _react2.default.createElement(_Title2.default, { title: 'Colected by browsing related images' })
	    ),
	    _react2.default.createElement(_ExampleList2.default, {
	      compact: true,
	      examples: relatedExamples })
	  );
	};

	exports.default = (0, _reactRedux.connect)(function (state) {
	  return {
	    directExamples: state.data.examples.filter(function (e) {
	      return state.ui.focusedQueries.indexOf(e.query) !== -1 && e.relevance > 0;
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
	    relatedExamples: state.data.examples.filter(function (e) {
	      return state.ui.focusedQueries.indexOf(e.query) !== -1 && e.relevance === -1;
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

/***/ 512:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"QueryView":"QueryView__QueryView___3aonz"};

/***/ },

/***/ 513:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _socket = __webpack_require__(514);

	var _socket2 = _interopRequireDefault(_socket);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var socket = (0, _socket2.default)('https://vdziubak.com/', { path: '/designFixationServer' });

	exports.default = socket;

/***/ },

/***/ 562:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.receiveData = exports.receiveQuery = exports.receiveExample = exports.INC_EXAMPLE_COUNTER = exports.RECEIVE_QUERY = exports.RECEIVE_EXAMPLE = exports.RECEIVE_QUERY_TASK = exports.RECEIVE_DATA = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _randomcolor = __webpack_require__(563);

	var _randomcolor2 = _interopRequireDefault(_randomcolor);

	var _algoliasearch = __webpack_require__(564);

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

/***/ 596:
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

/***/ 597:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(479);

	var _reduxLogger = __webpack_require__(598);

	var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

	var _reduxThunk = __webpack_require__(599);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _rootReducer = __webpack_require__(600);

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

/***/ 600:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(479);

	var _dataReducer = __webpack_require__(601);

	var _dataReducer2 = _interopRequireDefault(_dataReducer);

	var _uiReducer = __webpack_require__(603);

	var _uiReducer2 = _interopRequireDefault(_uiReducer);

	var _studyReducer = __webpack_require__(604);

	var _studyReducer2 = _interopRequireDefault(_studyReducer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var rootReducer = (0, _redux.combineReducers)({
	  data: _dataReducer2.default,
	  ui: _uiReducer2.default,
	  study: _studyReducer2.default
	});

		exports.default = rootReducer;

/***/ },

/***/ 601:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _dataActions = __webpack_require__(562);

	var _initialState = __webpack_require__(602);

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

/***/ 602:
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
	    focusedQueries: []
	  },
	  study: {
	    participantId: 'test',
	    sessionId: 'test',
	    condition: 'system',
	    taskAlias: 'cars'
	  }
		};

/***/ },

/***/ 603:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _uiActions = __webpack_require__(505);

	var _initialState = __webpack_require__(602);

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
	    default:
	      return state;
	  }
	};

	exports.default = ui;

/***/ },

/***/ 604:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _studyActions = __webpack_require__(596);

	var _initialState = __webpack_require__(602);

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

/***/ 605:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvQXBwL0FwcC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQXBwL0FwcC5jc3MiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL1Rhc2tEZXNjcmlwdGlvbi9UYXNrRGVzY3JpcHRpb24uanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1Rhc2tEZXNjcmlwdGlvbi9UYXNrRGVzY3JpcHRpb24uY3NzIiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9UaXRsZS9UaXRsZS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvVGl0bGUvVGl0bGUuY3NzIiwid2VicGFjazovLy9zcmMvbGF5b3V0cy9CbG9jay9CbG9jay5qc3giLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL1F1ZXJ5TGlzdC9RdWVyeUxpc3QuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1F1ZXJ5TGlzdC9RdWVyeUxpc3QuY3NzIiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9RdWVyeS9RdWVyeS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvUXVlcnkvUXVlcnkuY3NzIiwid2VicGFjazovLy9zcmMvc3RvcmUvdWlBY3Rpb25zLmpzIiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9Db2xsZWN0aW9uVmlldy9Db2xsZWN0aW9uVmlldy5qc3giLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL0V4YW1wbGVMaXN0L0V4YW1wbGVMaXN0LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9FeGFtcGxlTGlzdC9FeGFtcGxlTGlzdC5jc3MiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL0V4YW1wbGUvRXhhbXBsZS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRXhhbXBsZS9FeGFtcGxlLmNzcyIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvUXVlcnlWaWV3L1F1ZXJ5Vmlldy5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvUXVlcnlWaWV3L1F1ZXJ5Vmlldy5jc3MiLCJ3ZWJwYWNrOi8vL3NyYy9zdG9yZS9zb2NrZXQuanMiLCJ3ZWJwYWNrOi8vL3NyYy9zdG9yZS9kYXRhQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3N0dWR5QWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3N0b3JlLmpzIiwid2VicGFjazovLy9zcmMvc3RvcmUvcm9vdFJlZHVjZXIuanMiLCJ3ZWJwYWNrOi8vL3NyYy9zdG9yZS9kYXRhUmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL2luaXRpYWxTdGF0ZS5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3VpUmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vc3JjL3N0b3JlL3N0dWR5UmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL3Jlc2V0LmNzcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2JhYmVsLXBvbHlmaWxsJ1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJ1xuaW1wb3J0IEFwcCBmcm9tICcuL2NvbXBvbmVudHMvQXBwJ1xuaW1wb3J0IGNvbmZpZ3VyZVN0b3JlIGZyb20gJy4vc3RvcmUnXG5pbXBvcnQge1Byb3ZpZGVyfSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0ICcuL3N0eWxlcy9yZXNldC5jc3MnXG5cbmNvbnN0IHN0b3JlID0gY29uZmlndXJlU3RvcmUoKVxuXG5SZWFjdERPTS5yZW5kZXIoKFxuICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICA8QXBwIC8+XG4gIDwvUHJvdmlkZXI+XG4pLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzaWduRml4YXRpb25BcHAnKSlcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9pbmRleC5qc3hcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4J1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vQXBwLmNzcydcbmltcG9ydCBUYXNrRGVzY3JpcHRpb24gZnJvbSAnLi4vVGFza0Rlc2NyaXB0aW9uJ1xuaW1wb3J0IFF1ZXJ5TGlzdCBmcm9tICcuLi9RdWVyeUxpc3QnXG5pbXBvcnQgQ29sbGVjdGlvblZpZXcgZnJvbSAnLi4vQ29sbGVjdGlvblZpZXcnXG5pbXBvcnQgUXVlcnlWaWV3IGZyb20gJy4uL1F1ZXJ5VmlldydcblxuaW1wb3J0IHNvY2tldCBmcm9tICcuLi8uLi9zdG9yZS9zb2NrZXQnXG5pbXBvcnQge3JlY2VpdmVEYXRhLCByZWNlaXZlRXhhbXBsZSwgcmVjZWl2ZVF1ZXJ5fSBmcm9tICcuLi8uLi9zdG9yZS9kYXRhQWN0aW9ucydcbmltcG9ydCB7cmVjZWl2ZVN0dWR5fSBmcm9tICcuLi8uLi9zdG9yZS9zdHVkeUFjdGlvbnMnXG5cbmNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudFdpbGxNb3VudCAoKSB7XG4gICAgY29uc3Qge2Rpc3BhdGNofSA9IHRoaXMucHJvcHNcblxuICAgIHNvY2tldC5lbWl0KCdnZXQgc3R1ZHknKVxuXG4gICAgc29ja2V0Lm9uKCdzdHVkeScsIChkYXRhKSA9PiB7XG4gICAgICBkaXNwYXRjaChyZWNlaXZlU3R1ZHkoZGF0YS5wYXJ0aWNpcGFudElkLCBkYXRhLnNlc3Npb25JZCwgZGF0YS5jb25kaXRpb24sIGRhdGEudGFza0FsaWFzKSlcbiAgICAgIHNvY2tldC5lbWl0KCdnZXQgZGF0YScsIHtzZXNzaW9uSWQ6IGRhdGEuc2Vzc2lvbklkLCB0YXNrQWxpYXM6IGRhdGEudGFza0FsaWFzfSlcbiAgICB9KVxuXG4gICAgc29ja2V0Lm9uKCdjb25maXJtIGNyZWF0ZSBleGFtcGxlJywgZSA9PiB7XG4gICAgICBkaXNwYXRjaChyZWNlaXZlRXhhbXBsZShlKSlcbiAgICB9KVxuXG4gICAgc29ja2V0Lm9uKCdjb25maXJtIGNyZWF0ZSBxdWVyeScsIHEgPT4ge1xuICAgICAgZGlzcGF0Y2gocmVjZWl2ZVF1ZXJ5KHEpKVxuICAgIH0pXG5cbiAgICBzb2NrZXQub24oJ2RhdGEnLCAoZGF0YSkgPT4ge1xuICAgICAgZGlzcGF0Y2gocmVjZWl2ZURhdGEoZGF0YS5xdWVyaWVzLCBkYXRhLmV4YW1wbGVzLCBkYXRhLnRhc2spKVxuICAgIH0pXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHtmb2N1c2VkUXVlcmllc30gPSB0aGlzLnByb3BzXG5cbiAgICBsZXQgYm9keUVsID0gJydcbiAgICBpZiAoZm9jdXNlZFF1ZXJpZXMubGVuZ3RoID4gMCkge1xuICAgICAgYm9keUVsID0gKFxuICAgICAgICA8UXVlcnlWaWV3IC8+XG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIGJvZHlFbCA9IChcbiAgICAgICAgPENvbGxlY3Rpb25WaWV3IC8+XG4gICAgICApXG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuQXBwfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5BcHBTaWRlYmFyfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLkFwcFNpZGViYXJfX2hlYWRlcn0+XG4gICAgICAgICAgICA8VGFza0Rlc2NyaXB0aW9uIC8+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLkFwcFNpZGViYXJfX2JvZHl9PlxuICAgICAgICAgICAgPFF1ZXJ5TGlzdCAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLkFwcF9fbWFpbn0+XG4gICAgICAgICAge2JvZHlFbH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcbiAgc3RhdGUgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBzZXNzaW9uSWQ6IHN0YXRlLnN0dWR5LnNlc3Npb25JZCxcbiAgICAgIHRhc2tBbGlhczogc3RhdGUuc3R1ZHkudGFza0FsaWFzLFxuICAgICAgZm9jdXNlZFF1ZXJpZXM6IHN0YXRlLnVpLmZvY3VzZWRRdWVyaWVzXG4gICAgfVxuICB9XG4pKEFwcClcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jb21wb25lbnRzL0FwcC9BcHAuanN4XG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiQXBwXCI6XCJBcHBfX0FwcF9fX2xCRVhJXCIsXCJBcHBfX21haW5cIjpcIkFwcF9fQXBwX19tYWluX19fMlZaamlcIixcIkFwcFNpZGViYXJcIjpcIkFwcF9fQXBwU2lkZWJhcl9fX3dYdkY0XCIsXCJBcHBTaWRlYmFyX19oZWFkZXJcIjpcIkFwcF9fQXBwU2lkZWJhcl9faGVhZGVyX19fMld0cUNcIixcIkFwcFNpZGViYXJfX2JvZHlcIjpcIkFwcF9fQXBwU2lkZWJhcl9fYm9keV9fX1pkeVZfXCJ9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9BcHAvQXBwLmNzc1xuICoqIG1vZHVsZSBpZCA9IDQ5NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL1Rhc2tEZXNjcmlwdGlvbi5jc3MnXG5pbXBvcnQgVGl0bGUgZnJvbSAnLi4vVGl0bGUnXG5pbXBvcnQgQmxvY2sgZnJvbSAnLi4vLi4vbGF5b3V0cy9CbG9jaydcblxuY29uc3QgVGFza0Rlc2NyaXB0aW9uID0gKHtcbiAgdGFzayxcbiAgZm9jdXNlZFF1ZXJpZXNcbn0pID0+IHtcbiAgY29uc3QgcXVlcnlUYXNrcyA9IGZvY3VzZWRRdWVyaWVzLm1hcCgocSwgaSkgPT4ge1xuICAgIGxldCBtYXRjaGVkVGFzayA9IHEubWF0Y2hlZFRhc2tcblxuICAgIGlmIChtYXRjaGVkVGFzaykge1xuICAgICAgd2hpbGUgKG1hdGNoZWRUYXNrLmluZGV4T2YoJzxlbT4nKSAhPT0gLTEpIHtcbiAgICAgICAgY29uc3QgaW5zZXJ0UG9zaXRpb24gPSBtYXRjaGVkVGFzay5pbmRleE9mKCc8ZW0+JykgKyAzXG4gICAgICAgIGNvbnN0IHF1ZXJ5Q29sb3IgPSBgcmdiYSgke3EuY29sb3Iuc2xpY2UoNCwgcS5jb2xvci5sZW5ndGggLSAxKX0sIDAuMylgXG4gICAgICAgIG1hdGNoZWRUYXNrID0gYCR7bWF0Y2hlZFRhc2suc2xpY2UoMCwgaW5zZXJ0UG9zaXRpb24pfSBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICR7cXVlcnlDb2xvcn07XCIgJHttYXRjaGVkVGFzay5zbGljZShpbnNlcnRQb3NpdGlvbil9YFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAga2V5PXtpfVxuICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLlRhc2tEZXNjcmlwdGlvbl9fcXVlcnl9XG4gICAgICAgICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3tfX2h0bWw6IG1hdGNoZWRUYXNrfX0gLz5cbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5UYXNrRGVzY3JpcHRpb259PlxuICAgICAgPEJsb2NrPlxuICAgICAgICA8VGl0bGUgdGl0bGU9XCJEZXNpZ24gVGFza1wiIC8+XG4gICAgICA8L0Jsb2NrPlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLlRhc2tEZXNjcmlwdGlvbl9fYm9keX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuVGFza0Rlc2NyaXB0aW9uX19tYWlufT5cbiAgICAgICAgICB7dGFzay50ZXh0fVxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7cXVlcnlUYXNrc31cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXG4gIHN0YXRlID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgdGFzazogc3RhdGUuZGF0YS50YXNrIHx8IHt9LFxuICAgICAgZm9jdXNlZFF1ZXJpZXM6IHN0YXRlLmRhdGEucXVlcmllcy5maWx0ZXIocSA9PiBzdGF0ZS51aS5mb2N1c2VkUXVlcmllcy5pbmRleE9mKHEucXVlcnkpICE9PSAtMSlcbiAgICB9XG4gIH1cbikoVGFza0Rlc2NyaXB0aW9uKVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2NvbXBvbmVudHMvVGFza0Rlc2NyaXB0aW9uL1Rhc2tEZXNjcmlwdGlvbi5qc3hcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJUYXNrRGVzY3JpcHRpb25cIjpcIlRhc2tEZXNjcmlwdGlvbl9fVGFza0Rlc2NyaXB0aW9uX19fMXRPSzlcIixcIlRhc2tEZXNjcmlwdGlvbl9fYm9keVwiOlwiVGFza0Rlc2NyaXB0aW9uX19UYXNrRGVzY3JpcHRpb25fX2JvZHlfX18yaWFRN1wiLFwiVGFza0Rlc2NyaXB0aW9uX19tYWluXCI6XCJUYXNrRGVzY3JpcHRpb25fX1Rhc2tEZXNjcmlwdGlvbl9fbWFpbl9fX00zTklOXCIsXCJUYXNrRGVzY3JpcHRpb25fX3F1ZXJ5XCI6XCJUYXNrRGVzY3JpcHRpb25fX1Rhc2tEZXNjcmlwdGlvbl9fcXVlcnlfX18xaDJxT1wifTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvVGFza0Rlc2NyaXB0aW9uL1Rhc2tEZXNjcmlwdGlvbi5jc3NcbiAqKiBtb2R1bGUgaWQgPSA0OTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL1RpdGxlLmNzcydcblxuY29uc3QgVGl0bGUgPSAoe1xuICB0aXRsZVxufSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuVGl0bGV9PlxuICAgICAge3RpdGxlfVxuICAgIDwvZGl2PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IFRpdGxlXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvY29tcG9uZW50cy9UaXRsZS9UaXRsZS5qc3hcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJUaXRsZVwiOlwiVGl0bGVfX1RpdGxlX19fMTdCdUtcIn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL1RpdGxlL1RpdGxlLmNzc1xuICoqIG1vZHVsZSBpZCA9IDQ5OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5jb25zdCBiYXNlbGluZSA9IDAuNzUwXG5cbmNvbnN0IEJsb2NrID0gKHtcbiAgbiA9IDEsXG4gIGV4dHJhQ2xhc3NOYW1lcyA9ICcnLFxuICBjaGlsZHJlblxufSkgPT4ge1xuICBjb25zdCBzdHlsZSA9IHtcbiAgICBtYXJnaW5Cb3R0b206IGAke2Jhc2VsaW5lICogbn1yZW1gXG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3N0eWxlfSBjbGFzc05hbWU9e2V4dHJhQ2xhc3NOYW1lc30+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgQmxvY2tcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9sYXlvdXRzL0Jsb2NrL0Jsb2NrLmpzeFxuICoqLyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnXG5cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9RdWVyeUxpc3QuY3NzJ1xuaW1wb3J0IFF1ZXJ5IGZyb20gJy4uL1F1ZXJ5J1xuaW1wb3J0IFRpdGxlIGZyb20gJy4uL1RpdGxlJ1xuaW1wb3J0IEJsb2NrIGZyb20gJy4uLy4uL2xheW91dHMvQmxvY2snXG5cbmNsYXNzIFF1ZXJ5TGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3Qge3F1ZXJpZXN9ID0gdGhpcy5wcm9wc1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuUXVlcnlMaXN0fT5cbiAgICAgICAgPEJsb2NrPlxuICAgICAgICAgIDxUaXRsZSB0aXRsZT1cIlNlYXJjaGVzXCIgLz5cbiAgICAgICAgPC9CbG9jaz5cblxuICAgICAgICB7cXVlcmllcy5tYXAoKHEsIGluZGV4KSA9PlxuICAgICAgICAgIDxRdWVyeVxuICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgIHF1ZXJ5PXtxfSAvPlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXG4gIHN0YXRlID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgcXVlcmllczogc3RhdGUuZGF0YS5xdWVyaWVzLnNvcnQoKGEsIGIpID0+IGIuZXhhbXBsZXNDb3VudCAtIGEuZXhhbXBsZXNDb3VudClcbiAgICB9XG4gIH1cbikoUXVlcnlMaXN0KVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2NvbXBvbmVudHMvUXVlcnlMaXN0L1F1ZXJ5TGlzdC5qc3hcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxubW9kdWxlLmV4cG9ydHMgPSB7XCJRdWVyeUxpc3RcIjpcIlF1ZXJ5TGlzdF9fUXVlcnlMaXN0X19fMkhjZ0xcIn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL1F1ZXJ5TGlzdC9RdWVyeUxpc3QuY3NzXG4gKiogbW9kdWxlIGlkID0gNTAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4J1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vUXVlcnkuY3NzJ1xuXG5pbXBvcnQge3RvZ2dsZUZvY3VzUXVlcnl9IGZyb20gJy4uLy4uL3N0b3JlL3VpQWN0aW9ucydcblxuY29uc3QgUXVlcnkgPSAoe1xuICBxdWVyeSxcbiAgZm9jdXNlZFF1ZXJpZXMsXG4gIHRvZ2dsZUZvY3VzXG59KSA9PiB7XG4gIGxldCBzdHlsZSA9IHt9XG4gIGxldCBjbGFzc05hbWVzID0gW3N0eWxlcy5RdWVyeV1cbiAgaWYgKGZvY3VzZWRRdWVyaWVzLmluZGV4T2YocXVlcnkucXVlcnkpICE9PSAtMSkge1xuICAgIHN0eWxlLmJhY2tncm91bmRDb2xvciA9IGByZ2JhKCR7cXVlcnkuY29sb3Iuc2xpY2UoNCwgcXVlcnkuY29sb3IubGVuZ3RoIC0gMSl9LCAwLjMpYFxuICAgIGNsYXNzTmFtZXMucHVzaChzdHlsZXMuUXVlcnlfaXNGb2N1c2VkKVxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBvbkNsaWNrPXt0b2dnbGVGb2N1c31cbiAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5qb2luKCcgJyl9PlxuICAgICAge3F1ZXJ5LnF1ZXJ5fSAoe3F1ZXJ5LmV4YW1wbGVzQ291bnR9KVxuICAgIDwvZGl2PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXG4gIHN0YXRlID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgZm9jdXNlZFF1ZXJpZXM6IHN0YXRlLnVpLmZvY3VzZWRRdWVyaWVzXG4gICAgfVxuICB9LFxuICAoZGlzcGF0Y2gsIG93blByb3BzKSA9PiB7XG4gICAgY29uc3Qge3F1ZXJ5OiB7cXVlcnl9fSA9IG93blByb3BzXG5cbiAgICByZXR1cm4ge1xuICAgICAgdG9nZ2xlRm9jdXM6ICgpID0+IHtcbiAgICAgICAgZGlzcGF0Y2godG9nZ2xlRm9jdXNRdWVyeShxdWVyeSkpXG4gICAgICB9XG4gICAgfVxuICB9XG4pKFF1ZXJ5KVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2NvbXBvbmVudHMvUXVlcnkvUXVlcnkuanN4XG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiUXVlcnlcIjpcIlF1ZXJ5X19RdWVyeV9fXzMyeVZQXCIsXCJRdWVyeV9pc0ZvY3VzZWRcIjpcIlF1ZXJ5X19RdWVyeV9pc0ZvY3VzZWRfX18zWXU2WlwifTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudHMvUXVlcnkvUXVlcnkuY3NzXG4gKiogbW9kdWxlIGlkID0gNTA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnQgY29uc3QgVE9HR0xFX0hJR0hMSUdIVF9RVUVSWSA9ICdUT0dHTEVfSElHSExJR0hUX1FVRVJZJ1xuZXhwb3J0IGNvbnN0IFRPR0dMRV9GT0NVU19RVUVSWSA9ICdUT0dHTEVfRk9DVVNfUVVFUlknXG5cbmV4cG9ydCBjb25zdCB0b2dnbGVIaWdobGlnaHRRdWVyeSA9IChxdWVyeSkgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IFRPR0dMRV9ISUdITElHSFRfUVVFUlksXG4gICAgcXVlcnlcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgdG9nZ2xlRm9jdXNRdWVyeSA9IChxdWVyeSkgPT4ge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IFRPR0dMRV9GT0NVU19RVUVSWSxcbiAgICBxdWVyeVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvc3RvcmUvdWlBY3Rpb25zLmpzXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0IEV4YW1wbGVMaXN0IGZyb20gJy4uL0V4YW1wbGVMaXN0J1xuXG5jb25zdCBDb2xsZWN0aW9uVmlldyA9ICh7XG4gIGV4YW1wbGVzXG59KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEV4YW1wbGVMaXN0IGV4YW1wbGVzPXtleGFtcGxlc30gLz5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxuICBzdGF0ZSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGV4YW1wbGVzOiBzdGF0ZS5kYXRhLmV4YW1wbGVzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgaWYgKGIuY3JlYXRlZEF0ID4gYS5jcmVhdGVkQXQpIHtcbiAgICAgICAgICByZXR1cm4gLTFcbiAgICAgICAgfSBlbHNlIGlmIChhLmNyZWF0ZWRBdCA+PSBiLmNyZWF0ZWRBdCkge1xuICAgICAgICAgIHJldHVybiAxXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG4pKENvbGxlY3Rpb25WaWV3KVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2NvbXBvbmVudHMvQ29sbGVjdGlvblZpZXcvQ29sbGVjdGlvblZpZXcuanN4XG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vRXhhbXBsZUxpc3QuY3NzJ1xuaW1wb3J0IEV4YW1wbGUgZnJvbSAnLi4vRXhhbXBsZSdcblxuY2xhc3MgRXhhbXBsZUxpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHtleGFtcGxlcywgY29tcGFjdCA9IGZhbHNlfSA9IHRoaXMucHJvcHNcbiAgICBjb25zdCBjb2x1bW5zID0gW11cbiAgICBjb25zdCBuQ29scyA9IGNvbXBhY3QgPyA4IDogNVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuQ29sczsgaSsrKSB7XG4gICAgICBjb25zdCBjb2x1bW4gPSBleGFtcGxlcy5maWx0ZXIoKGUsIGluZGV4KSA9PiB7XG4gICAgICAgIHJldHVybiBpbmRleCAlIG5Db2xzID09PSBpXG4gICAgICB9KVxuXG4gICAgICBjb2x1bW5zLnB1c2goY29sdW1uKVxuICAgIH1cblxuICAgIGxldCBjbGFzc05hbWVzID0gW3N0eWxlcy5FeGFtcGxlTGlzdF1cbiAgICBpZiAoY29tcGFjdCkge1xuICAgICAgY2xhc3NOYW1lcy5wdXNoKHN0eWxlcy5FeGFtcGxlTGlzdF9jb21wYWN0KVxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5qb2luKCcgJyl9PlxuICAgICAgICB7Y29sdW1ucy5tYXAoKGNvbHVtbiwgaSkgPT5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5FeGFtcGxlTGlzdF9fY29sdW1ufT5cbiAgICAgICAgICAgIHtjb2x1bW4ubWFwKChleGFtcGxlLCBqKSA9PlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAga2V5PXtqfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17c3R5bGVzLkV4YW1wbGVMaXN0X19leGFtcGxlfT5cbiAgICAgICAgICAgICAgICA8RXhhbXBsZVxuICAgICAgICAgICAgICAgICAgY29tcGFjdD17Y29tcGFjdH1cbiAgICAgICAgICAgICAgICAgIGV4YW1wbGU9e2V4YW1wbGV9IC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX08L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFeGFtcGxlTGlzdFxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2NvbXBvbmVudHMvRXhhbXBsZUxpc3QvRXhhbXBsZUxpc3QuanN4XG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiRXhhbXBsZUxpc3RcIjpcIkV4YW1wbGVMaXN0X19FeGFtcGxlTGlzdF9fXzc0SmMzXCIsXCJFeGFtcGxlTGlzdF9fY29sdW1uXCI6XCJFeGFtcGxlTGlzdF9fRXhhbXBsZUxpc3RfX2NvbHVtbl9fXzNGemtXXCIsXCJFeGFtcGxlTGlzdF9fZXhhbXBsZVwiOlwiRXhhbXBsZUxpc3RfX0V4YW1wbGVMaXN0X19leGFtcGxlX19fM2VqTF9cIixcIkV4YW1wbGVMaXN0X2NvbXBhY3RcIjpcIkV4YW1wbGVMaXN0X19FeGFtcGxlTGlzdF9jb21wYWN0X19fZi0tY0JcIn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnRzL0V4YW1wbGVMaXN0L0V4YW1wbGVMaXN0LmNzc1xuICoqIG1vZHVsZSBpZCA9IDUwOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL0V4YW1wbGUuY3NzJ1xuaW1wb3J0IHt0b2dnbGVIaWdobGlnaHRRdWVyeX0gZnJvbSAnLi4vLi4vc3RvcmUvdWlBY3Rpb25zJ1xuXG5jb25zdCBFeGFtcGxlID0gKHtcbiAgZXhhbXBsZSxcbiAgY29tcGFjdCxcbiAgY29sb3IsXG4gIGZvY3VzZWRRdWVyaWVzLFxuICBoaWdobGlnaHRlZFF1ZXJ5LFxuICBoaWdobGlnaHRRdWVyeVxufSkgPT4ge1xuICBsZXQgc3R5bGUgPSB7fVxuICBsZXQgY2xhc3NOYW1lcyA9IFtzdHlsZXMuRXhhbXBsZV1cbiAgaWYgKGNvbXBhY3QpIHtcbiAgICBjbGFzc05hbWVzLnB1c2goc3R5bGVzLkV4YW1wbGVfY29tcGFjdClcbiAgfVxuICBpZiAoZm9jdXNlZFF1ZXJpZXMubGVuZ3RoID4gMSAmJiBoaWdobGlnaHRlZFF1ZXJ5ID09PSBleGFtcGxlLnF1ZXJ5KSB7XG4gICAgc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYHJnYmEoJHtjb2xvci5zbGljZSg0LCBjb2xvci5sZW5ndGggLSAxKX0sIDAuMylgXG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIG9uTW91c2VFbnRlcj17aGlnaGxpZ2h0UXVlcnl9XG4gICAgICBvbk1vdXNlTGVhdmU9e2hpZ2hsaWdodFF1ZXJ5fVxuICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzLmpvaW4oJyAnKX0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLkV4YW1wbGVfX2ltYWdlV3JhcHBlcn0+XG4gICAgICAgIDxpbWdcbiAgICAgICAgICBjbGFzc05hbWU9e3N0eWxlcy5FeGFtcGxlX19pbWFnZX1cbiAgICAgICAgICBzcmM9e2V4YW1wbGUuZXhhbXBsZS5zcmN9IC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5FeGFtcGxlX19kZXNjcmlwdGlvbn0+XG4gICAgICAgIHtleGFtcGxlLmltYWdlRGVzY3JpcHRpb259XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxuICAoc3RhdGUsIG93blByb3BzKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGZvY3VzZWRRdWVyaWVzOiBzdGF0ZS51aS5mb2N1c2VkUXVlcmllcyxcbiAgICAgIGhpZ2hsaWdodGVkUXVlcnk6IHN0YXRlLnVpLmhpZ2hsaWdodGVkUXVlcnksXG4gICAgICBjb2xvcjogc3RhdGUuZGF0YS5xdWVyaWVzLmZpbHRlcihxID0+IHEucXVlcnkgPT09IG93blByb3BzLmV4YW1wbGUucXVlcnkpWzBdLmNvbG9yXG4gICAgfVxuICB9LFxuICAoZGlzcGF0Y2gsIG93blByb3BzKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGhpZ2hsaWdodFF1ZXJ5OiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHtxdWVyeX0gPSBvd25Qcm9wcy5leGFtcGxlXG5cbiAgICAgICAgZGlzcGF0Y2godG9nZ2xlSGlnaGxpZ2h0UXVlcnkocXVlcnkpKVxuICAgICAgfVxuICAgIH1cbiAgfVxuKShFeGFtcGxlKVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL2NvbXBvbmVudHMvRXhhbXBsZS9FeGFtcGxlLmpzeFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcIkV4YW1wbGVcIjpcIkV4YW1wbGVfX0V4YW1wbGVfX18yN1MwaVwiLFwiRXhhbXBsZV9faW1hZ2VXcmFwcGVyXCI6XCJFeGFtcGxlX19FeGFtcGxlX19pbWFnZVdyYXBwZXJfX18xTC16NVwiLFwiRXhhbXBsZV9faW1hZ2VcIjpcIkV4YW1wbGVfX0V4YW1wbGVfX2ltYWdlX19fM1lkNjFcIixcIkV4YW1wbGVfX2Rlc2NyaXB0aW9uXCI6XCJFeGFtcGxlX19FeGFtcGxlX19kZXNjcmlwdGlvbl9fXzFSV2hyXCIsXCJFeGFtcGxlX2NvbXBhY3RcIjpcIkV4YW1wbGVfX0V4YW1wbGVfY29tcGFjdF9fXzJrWWZKXCJ9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9FeGFtcGxlL0V4YW1wbGUuY3NzXG4gKiogbW9kdWxlIGlkID0gNTEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4J1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vUXVlcnlWaWV3LmNzcydcbmltcG9ydCBFeGFtcGxlTGlzdCBmcm9tICcuLi9FeGFtcGxlTGlzdCdcbmltcG9ydCBCbG9jayBmcm9tICcuLi8uLi9sYXlvdXRzL0Jsb2NrJ1xuaW1wb3J0IFRpdGxlIGZyb20gJy4uL1RpdGxlJ1xuXG5jb25zdCBRdWVyeVZpZXcgPSAoe1xuICBkaXJlY3RFeGFtcGxlcyxcbiAgcmVsYXRlZEV4YW1wbGVzXG59KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5RdWVyeVZpZXd9PlxuICAgICAgPEJsb2NrPlxuICAgICAgICA8QmxvY2s+XG4gICAgICAgICAgPFRpdGxlIHRpdGxlPVwiQ29sZWN0ZWQgYnkgYnJvd3Npbmcgc2VhcmNoIHJlc3VsdHNcIiAvPlxuICAgICAgICA8L0Jsb2NrPlxuXG4gICAgICAgIDxFeGFtcGxlTGlzdFxuICAgICAgICAgIGNvbXBhY3RcbiAgICAgICAgICBleGFtcGxlcz17ZGlyZWN0RXhhbXBsZXN9IC8+XG4gICAgICA8L0Jsb2NrPlxuXG4gICAgICA8QmxvY2s+XG4gICAgICAgIDxUaXRsZSB0aXRsZT1cIkNvbGVjdGVkIGJ5IGJyb3dzaW5nIHJlbGF0ZWQgaW1hZ2VzXCIgLz5cbiAgICAgIDwvQmxvY2s+XG5cbiAgICAgIDxFeGFtcGxlTGlzdFxuICAgICAgICBjb21wYWN0XG4gICAgICAgIGV4YW1wbGVzPXtyZWxhdGVkRXhhbXBsZXN9IC8+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcbiAgc3RhdGUgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBkaXJlY3RFeGFtcGxlczogc3RhdGUuZGF0YS5leGFtcGxlc1xuICAgICAgICAuZmlsdGVyKGUgPT4gc3RhdGUudWkuZm9jdXNlZFF1ZXJpZXMuaW5kZXhPZihlLnF1ZXJ5KSAhPT0gLTEgJiYgZS5yZWxldmFuY2UgPiAwKVxuICAgICAgICAuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgIGlmIChhLnF1ZXJ5ID4gYi5xdWVyeSkge1xuICAgICAgICAgICAgcmV0dXJuIDFcbiAgICAgICAgICB9IGVsc2UgaWYgKGEucXVlcnkgPCBiLnF1ZXJ5KSB7XG4gICAgICAgICAgICByZXR1cm4gLTFcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGEuY3JlYXRlZEF0ID4gYi5jcmVhdGVkQXQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDFcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiAtMVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICByZWxhdGVkRXhhbXBsZXM6IHN0YXRlLmRhdGEuZXhhbXBsZXNcbiAgICAgICAgLmZpbHRlcihlID0+IHN0YXRlLnVpLmZvY3VzZWRRdWVyaWVzLmluZGV4T2YoZS5xdWVyeSkgIT09IC0xICYmIGUucmVsZXZhbmNlID09PSAtMSlcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICBpZiAoYS5xdWVyeSA+IGIucXVlcnkpIHtcbiAgICAgICAgICAgIHJldHVybiAxXG4gICAgICAgICAgfSBlbHNlIGlmIChhLnF1ZXJ5IDwgYi5xdWVyeSkge1xuICAgICAgICAgICAgcmV0dXJuIC0xXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChhLmNyZWF0ZWRBdCA+IGIuY3JlYXRlZEF0KSB7XG4gICAgICAgICAgICAgIHJldHVybiAxXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gLTFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuICB9XG4pKFF1ZXJ5VmlldylcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9jb21wb25lbnRzL1F1ZXJ5Vmlldy9RdWVyeVZpZXcuanN4XG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cbm1vZHVsZS5leHBvcnRzID0ge1wiUXVlcnlWaWV3XCI6XCJRdWVyeVZpZXdfX1F1ZXJ5Vmlld19fXzNhb256XCJ9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY29tcG9uZW50cy9RdWVyeVZpZXcvUXVlcnlWaWV3LmNzc1xuICoqIG1vZHVsZSBpZCA9IDUxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IGlvIGZyb20gJ3NvY2tldC5pby1jbGllbnQnXG5cbmNvbnN0IHNvY2tldCA9IGlvKCdodHRwczovL3Zkeml1YmFrLmNvbS8nLCB7cGF0aDogJy9kZXNpZ25GaXhhdGlvblNlcnZlcid9KVxuXG5leHBvcnQgZGVmYXVsdCBzb2NrZXRcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9zdG9yZS9zb2NrZXQuanNcbiAqKi8iLCJpbXBvcnQgcmFuZG9tY29sb3IgZnJvbSAncmFuZG9tY29sb3InXG5pbXBvcnQgYWxnb2xpYXNlYXJjaCBmcm9tICdhbGdvbGlhc2VhcmNoJ1xuXG5jb25zdCBjbGllbnQgPSBhbGdvbGlhc2VhcmNoKCc3NFMxSk5CMVpUJywgJzNkZTZmZGJhZmM0NzdjZjAxOTY3M2JiODEwNDNhZTBkJylcbmNvbnN0IGluZGV4ID0gY2xpZW50LmluaXRJbmRleCgnRGVzaWduRml4YXRpb25TdHVkeVRhc2tzJylcblxuZXhwb3J0IGNvbnN0IFJFQ0VJVkVfREFUQSA9ICdSRUNFSVZFX0RBVEEnXG5leHBvcnQgY29uc3QgUkVDRUlWRV9RVUVSWV9UQVNLID0gJ1JFQ0VJVkVfUVVFUllfVEFTSydcbmV4cG9ydCBjb25zdCBSRUNFSVZFX0VYQU1QTEUgPSAnUkVDRUlWRV9FWEFNUExFJ1xuZXhwb3J0IGNvbnN0IFJFQ0VJVkVfUVVFUlkgPSAnUkVDRUlWRV9RVUVSWSdcbmV4cG9ydCBjb25zdCBJTkNfRVhBTVBMRV9DT1VOVEVSID0gJ0lOQ19FWEFNUExFX0NPVU5URVInXG5cbmV4cG9ydCBjb25zdCByZWNlaXZlRXhhbXBsZSA9IChleGFtcGxlKSA9PiB7XG4gIHJldHVybiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgY29uc29sZS5sb2coZXhhbXBsZSlcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBJTkNfRVhBTVBMRV9DT1VOVEVSLFxuICAgICAgcXVlcnk6IGV4YW1wbGUucXVlcnlcbiAgICB9KVxuXG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogUkVDRUlWRV9FWEFNUExFLFxuICAgICAgZXhhbXBsZVxuICAgIH0pXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHJlY2VpdmVRdWVyeSA9IChxdWVyeSkgPT4ge1xuICByZXR1cm4gZGlzcGF0Y2ggPT4ge1xuICAgIGNvbnNvbGUubG9nKHF1ZXJ5KVxuICAgIGNvbnN0IGNvbG9yID0gcmFuZG9tY29sb3Ioe1xuICAgICAgbHVtaW5vc2l0eTogJ2JyaWdodCcsXG4gICAgICBmb3JtYXQ6ICdyZ2InXG4gICAgfSlcblxuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFJFQ0VJVkVfUVVFUlksXG4gICAgICBxdWVyeTogT2JqZWN0LmFzc2lnbih7fSwgcXVlcnksIHtcbiAgICAgICAgZXhhbXBsZXNDb3VudDogMCxcbiAgICAgICAgY29sb3JcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgcmVjZWl2ZURhdGEgPSAocXVlcmllcywgZXhhbXBsZXMsIHRhc2spID0+IHtcbiAgcmV0dXJuIGRpc3BhdGNoID0+IHtcbiAgICBjb25zdCBjb2xvcnMgPSByYW5kb21jb2xvcih7XG4gICAgICBjb3VudDogcXVlcmllcy5sZW5ndGgsXG4gICAgICBsdW1pbm9zaXR5OiAnYnJpZ2h0JyxcbiAgICAgIGZvcm1hdDogJ3JnYidcbiAgICB9KVxuXG4gICAgY29uc3QgZW5oYW5jZWRRdWVyaWVzID0gcXVlcmllcy5tYXAoKHEsIGluZGV4KSA9PiBPYmplY3QuYXNzaWduKHt9LCBxLCB7XG4gICAgICBleGFtcGxlc0NvdW50OiBleGFtcGxlcy5maWx0ZXIoZSA9PiBlLnF1ZXJ5ID09PSBxLnF1ZXJ5KS5sZW5ndGgsXG4gICAgICBjb2xvcjogY29sb3JzW2luZGV4XVxuICAgIH0pKVxuXG4gICAgLy8gZm9yIChsZXQgcXVlcnkgb2YgcXVlcmllcykge1xuICAgIC8vICAgaW5kZXguc2VhcmNoKHF1ZXJ5LnF1ZXJ5LCAoZXJyLCBjb250ZW50KSA9PiB7XG4gICAgLy8gICAgIGlmIChjb250ZW50LmhpdHMubGVuZ3RoKSB7XG4gICAgLy8gICAgICAgY29uc3QgbWF0Y2hlZFRhc2sgPSBjb250ZW50LmhpdHMuZmlsdGVyKGggPT4gaC50YXNrQWxpYXMgPT09IHRhc2suYWxpYXMpWzBdXG4gICAgLy9cbiAgICAvLyAgICAgICBkaXNwYXRjaCh7XG4gICAgLy8gICAgICAgICB0eXBlOiBSRUNFSVZFX1FVRVJZX1RBU0ssXG4gICAgLy8gICAgICAgICBtYXRjaGVkVGFzazogbWF0Y2hlZFRhc2suX2hpZ2hsaWdodFJlc3VsdC50ZXh0LnZhbHVlLFxuICAgIC8vICAgICAgICAgcXVlcnk6IHF1ZXJ5LnF1ZXJ5XG4gICAgLy8gICAgICAgfSlcbiAgICAvLyAgICAgfVxuICAgIC8vICAgfSlcbiAgICAvLyB9XG5cbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBSRUNFSVZFX0RBVEEsXG4gICAgICBxdWVyaWVzOiBlbmhhbmNlZFF1ZXJpZXMsXG4gICAgICBleGFtcGxlcyxcbiAgICAgIHRhc2tcbiAgICB9KVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvc3RvcmUvZGF0YUFjdGlvbnMuanNcbiAqKi8iLCJleHBvcnQgY29uc3QgUkVDRUlWRV9TVFVEWSA9ICdSRUNFSVZFX1NUVURZJ1xuXG5leHBvcnQgY29uc3QgcmVjZWl2ZVN0dWR5ID0gKFxuICBwYXJ0aWNpcGFudElkLFxuICBzZXNzaW9uSWQsXG4gIGNvbmRpdGlvbixcbiAgdGFza0FsaWFzXG4pID0+IHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBSRUNFSVZFX1NUVURZLFxuICAgIHBhcnRpY2lwYW50SWQsXG4gICAgc2Vzc2lvbklkLFxuICAgIGNvbmRpdGlvbixcbiAgICB0YXNrQWxpYXNcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL3N0b3JlL3N0dWR5QWN0aW9ucy5qc1xuICoqLyIsImltcG9ydCB7Y3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZX0gZnJvbSAncmVkdXgnXG5pbXBvcnQgY3JlYXRlTG9nZ2VyIGZyb20gJ3JlZHV4LWxvZ2dlcidcbmltcG9ydCB0aHVua01pZGRsZXdhcmUgZnJvbSAncmVkdXgtdGh1bmsnXG5pbXBvcnQgcm9vdFJlZHVjZXIgZnJvbSAnLi9yb290UmVkdWNlcidcblxuY29uc3QgbWlkZGxld2FyZSA9IFt0aHVua01pZGRsZXdhcmVdXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xuICBjb25zdCBsb2dnZXIgPSBjcmVhdGVMb2dnZXIoKVxuICBtaWRkbGV3YXJlLnB1c2gobG9nZ2VyKVxufVxuXG5jb25zdCBjb25maWd1cmVTdG9yZSA9IChpbml0aWFsU3RhdGUpID0+IHtcbiAgcmV0dXJuIGNyZWF0ZVN0b3JlKFxuICAgIHJvb3RSZWR1Y2VyLFxuICAgIGluaXRpYWxTdGF0ZSxcbiAgICBhcHBseU1pZGRsZXdhcmUoLi4ubWlkZGxld2FyZSlcbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25maWd1cmVTdG9yZVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL3N0b3JlL3N0b3JlLmpzXG4gKiovIiwiaW1wb3J0IHtjb21iaW5lUmVkdWNlcnN9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IGRhdGEgZnJvbSAnLi9kYXRhUmVkdWNlcidcbmltcG9ydCB1aSBmcm9tICcuL3VpUmVkdWNlcidcbmltcG9ydCBzdHVkeSBmcm9tICcuL3N0dWR5UmVkdWNlcidcblxuY29uc3Qgcm9vdFJlZHVjZXIgPSBjb21iaW5lUmVkdWNlcnMoe1xuICBkYXRhLFxuICB1aSxcbiAgc3R1ZHlcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IHJvb3RSZWR1Y2VyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvc3RvcmUvcm9vdFJlZHVjZXIuanNcbiAqKi8iLCJpbXBvcnQge1JFQ0VJVkVfREFUQSwgUkVDRUlWRV9RVUVSWV9UQVNLLCBSRUNFSVZFX0VYQU1QTEUsIFJFQ0VJVkVfUVVFUlksIElOQ19FWEFNUExFX0NPVU5URVJ9IGZyb20gJy4vZGF0YUFjdGlvbnMnXG5pbXBvcnQgaW5pdGlhbFN0YXRlIGZyb20gJy4vaW5pdGlhbFN0YXRlJ1xuXG5jb25zdCBkYXRhID0gKFxuICBzdGF0ZSA9IGluaXRpYWxTdGF0ZS5kYXRhLFxuICBhY3Rpb25cbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBSRUNFSVZFX0RBVEE6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgcXVlcmllczogYWN0aW9uLnF1ZXJpZXMsXG4gICAgICAgIGV4YW1wbGVzOiBhY3Rpb24uZXhhbXBsZXMsXG4gICAgICAgIHRhc2s6IGFjdGlvbi50YXNrXG4gICAgICB9KVxuICAgIGNhc2UgUkVDRUlWRV9FWEFNUExFOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGV4YW1wbGVzOiBbXG4gICAgICAgICAgLi4uc3RhdGUuZXhhbXBsZXMsXG4gICAgICAgICAgYWN0aW9uLmV4YW1wbGVcbiAgICAgICAgXVxuICAgICAgfSlcbiAgICBjYXNlIFJFQ0VJVkVfUVVFUlk6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgcXVlcmllczogW1xuICAgICAgICAgIC4uLnN0YXRlLnF1ZXJpZXMsXG4gICAgICAgICAgYWN0aW9uLnF1ZXJ5XG4gICAgICAgIF1cbiAgICAgIH0pXG4gICAgY2FzZSBJTkNfRVhBTVBMRV9DT1VOVEVSOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIHF1ZXJpZXM6IHN0YXRlLnF1ZXJpZXMubWFwKHEgPT4ge1xuICAgICAgICAgIGlmIChxLnF1ZXJ5ID09PSBhY3Rpb24ucXVlcnkpIHtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBxLCB7XG4gICAgICAgICAgICAgIGV4YW1wbGVzQ291bnQ6IHEuZXhhbXBsZXNDb3VudCArIDFcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBxXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICBjYXNlIFJFQ0VJVkVfUVVFUllfVEFTSzpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBxdWVyaWVzOiBzdGF0ZS5xdWVyaWVzLm1hcChxID0+IHtcbiAgICAgICAgICBpZiAocS5xdWVyeSA9PT0gYWN0aW9uLnF1ZXJ5KSB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgcSwge1xuICAgICAgICAgICAgICBtYXRjaGVkVGFzazogYWN0aW9uLm1hdGNoZWRUYXNrXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gcVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRhdGFcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9zdG9yZS9kYXRhUmVkdWNlci5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IHtcbiAgZGF0YToge1xuICAgIHF1ZXJpZXM6IFtdLFxuICAgIGV4YW1wbGVzOiBbXSxcbiAgICB0YXNrOiB7fVxuICB9LFxuICB1aToge1xuICAgIGhpZ2hsaWdodGVkUXVlcnk6IG51bGwsXG4gICAgZm9jdXNlZFF1ZXJpZXM6IFtdXG4gIH0sXG4gIHN0dWR5OiB7XG4gICAgcGFydGljaXBhbnRJZDogJ3Rlc3QnLFxuICAgIHNlc3Npb25JZDogJ3Rlc3QnLFxuICAgIGNvbmRpdGlvbjogJ3N5c3RlbScsXG4gICAgdGFza0FsaWFzOiAnY2FycydcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogc3JjL3N0b3JlL2luaXRpYWxTdGF0ZS5qc1xuICoqLyIsImltcG9ydCB7VE9HR0xFX0hJR0hMSUdIVF9RVUVSWSwgVE9HR0xFX0ZPQ1VTX1FVRVJZfSBmcm9tICcuL3VpQWN0aW9ucydcbmltcG9ydCBpbml0aWFsU3RhdGUgZnJvbSAnLi9pbml0aWFsU3RhdGUnXG5cbmNvbnN0IHVpID0gKFxuICBzdGF0ZSA9IGluaXRpYWxTdGF0ZS51aSxcbiAgYWN0aW9uXG4pID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgVE9HR0xFX0hJR0hMSUdIVF9RVUVSWTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBoaWdobGlnaHRlZFF1ZXJ5OiBhY3Rpb24ucXVlcnkgPT09IHN0YXRlLmhpZ2hsaWdodGVkUXVlcnkgPyBudWxsIDogYWN0aW9uLnF1ZXJ5XG4gICAgICB9KVxuICAgIGNhc2UgVE9HR0xFX0ZPQ1VTX1FVRVJZOlxuICAgICAgY29uc3QgdGFyZ2V0UXVlcnlJbmRleCA9IHN0YXRlLmZvY3VzZWRRdWVyaWVzLmluZGV4T2YoYWN0aW9uLnF1ZXJ5KVxuICAgICAgbGV0IGZvY3VzZWRRdWVyaWVzID0gW11cbiAgICAgIGlmICh0YXJnZXRRdWVyeUluZGV4ID09PSAtMSkge1xuICAgICAgICBmb2N1c2VkUXVlcmllcyA9IFtcbiAgICAgICAgICAuLi5zdGF0ZS5mb2N1c2VkUXVlcmllcyxcbiAgICAgICAgICBhY3Rpb24ucXVlcnlcbiAgICAgICAgXVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9jdXNlZFF1ZXJpZXMgPSBbXG4gICAgICAgICAgLi4uc3RhdGUuZm9jdXNlZFF1ZXJpZXMuc2xpY2UoMCwgdGFyZ2V0UXVlcnlJbmRleCksXG4gICAgICAgICAgLi4uc3RhdGUuZm9jdXNlZFF1ZXJpZXMuc2xpY2UodGFyZ2V0UXVlcnlJbmRleCArIDEpXG4gICAgICAgIF1cbiAgICAgIH1cbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBmb2N1c2VkUXVlcmllczogZm9jdXNlZFF1ZXJpZXNcbiAgICAgIH0pXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHVpXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBzcmMvc3RvcmUvdWlSZWR1Y2VyLmpzXG4gKiovIiwiaW1wb3J0IHtSRUNFSVZFX1NUVURZfSBmcm9tICcuL3N0dWR5QWN0aW9ucydcbmltcG9ydCBpbml0aWFsU3RhdGUgZnJvbSAnLi9pbml0aWFsU3RhdGUnXG5cbmNvbnN0IHN0dWR5ID0gKFxuICBzdGF0ZSA9IGluaXRpYWxTdGF0ZS5zdHVkeSxcbiAgYWN0aW9uXG4pID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgUkVDRUlWRV9TVFVEWTpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBwYXJ0aWNpcGFudElkOiBhY3Rpb24ucGFydGljaXBhbnRJZCxcbiAgICAgICAgc2Vzc2lvbklkOiBhY3Rpb24uc2Vzc2lvbklkLFxuICAgICAgICBjb25kaXRpb246IGFjdGlvbi5jb25kaXRpb24sXG4gICAgICAgIHRhc2tBbGlhczogYWN0aW9uLnRhc2tBbGlhc1xuICAgICAgfSlcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgc3R1ZHlcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHNyYy9zdG9yZS9zdHVkeVJlZHVjZXIuanNcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvc3R5bGVzL3Jlc2V0LmNzc1xuICoqIG1vZHVsZSBpZCA9IDYwNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTs7Ozs7Ozs7Ozs7Ozs7O0FDYkE7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7QUFBQTtBQUNBOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUlBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFMQTtBQVVBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFYQTtBQWdCQTs7OztBQXZEQTtBQUNBO0FBeURBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBOzs7Ozs7O0FDOUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNEQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFDQTtBQUdBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUlBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFJQTtBQUxBO0FBTEE7QUFjQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBRkE7QUFJQTs7Ozs7OztBQ3ZEQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBSUE7QUFDQTs7Ozs7Ozs7QUNiQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFJQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDbkJBO0FBQ0E7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7OztBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUlBO0FBQUE7QUFFQTtBQUNBO0FBSEE7QUFMQTtBQVlBOzs7O0FBakJBO0FBQ0E7QUFtQkE7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQURBO0FBR0E7Ozs7Ozs7QUNqQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ0RBO0FBQ0E7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBOzs7QUFDQTtBQUlBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBSUE7QUFKQTtBQUFBO0FBT0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7Ozs7Ozs7QUMzQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7Ozs7Ozs7Ozs7Ozs7QUNmQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQVNBOzs7Ozs7Ozs7Ozs7Ozs7QUN4QkE7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFWQTtBQUNBO0FBSUE7QUFBQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFEQTtBQUhBO0FBREE7QUFEQTtBQWlCQTs7OztBQXJDQTtBQUNBO0FBdUNBOzs7Ozs7O0FDN0NBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNEQTtBQUNBOzs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQ0E7QUFPQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFNQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBWEE7QUFnQkE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBSEE7QUFLQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFPQTs7Ozs7OztBQzFEQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7QUFHQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBSUE7QUFDQTtBQUNBO0FBUEE7QUFVQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBSUE7QUFDQTtBQUNBO0FBakJBO0FBb0JBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBOUJBO0FBZ0NBOzs7Ozs7O0FDckVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNEQTtBQUNBOzs7OztBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSEE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUNBO0FBS0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBRkE7QUFBQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BOzs7Ozs7Ozs7Ozs7O0FDOUVBO0FBQ0E7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBT0E7Ozs7Ozs7Ozs7Ozs7QUNmQTtBQUNBO0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ25CQTtBQUNBO0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFLQTs7Ozs7Ozs7Ozs7Ozs7O0FDWEE7QUFDQTtBQUFBO0FBQ0E7Ozs7Ozs7QUFDQTtBQUdBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBREE7QUFNQTtBQUNBO0FBQ0E7QUFEQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQVdBO0FBQ0E7QUE5Q0E7QUFnREE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQVZBOzs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQUE7QUFDQTs7Ozs7OztBQUNBO0FBR0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBdkJBO0FBeUJBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQ0E7QUFDQTtBQUFBO0FBQ0E7Ozs7O0FBQ0E7QUFHQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQVRBO0FBV0E7QUFDQTs7Ozs7Ozs7QUNuQkE7Ozs7Iiwic291cmNlUm9vdCI6IiJ9