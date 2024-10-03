from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])
def candlestick_data(request):
    data = {
        "data": [
            {"x": "2023-01-01", "open": 30, "high": 40, "low": 25, "close": 35},
            {"x": "2023-01-02", "open": 35, "high": 45, "low": 30, "close": 40},
            {"x": "2023-01-03", "open": 40, "high": 50, "low": 35, "close": 45},
            {"x": "2023-01-04", "open": 45, "high": 55, "low": 40, "close": 50},
            {"x": "2023-01-05", "open": 50, "high": 60, "low": 45, "close": 55},
        ]
    }
    return Response(data)

@api_view(['GET'])
def line_chart_data(request):
    data = {
        "labels": ["Jan", "Feb", "Mar", "Apr", "May"],
        "data": [10, 20, 30, 40, 50]
    }
    return Response(data)

@api_view(['GET'])
def bar_chart_data(request):
    data = {
        "labels": ["Product A", "Product B", "Product C", "Product D", "Product E"],
        "data": [100, 150, 200, 120, 180]
    }
    return Response(data)

@api_view(['GET'])
def pie_chart_data(request):
    data = {
        "labels": ["Red", "Blue", "Yellow", "Green", "Purple"],
        "data": [300, 50, 100, 75, 125]
    }
    return Response(data)