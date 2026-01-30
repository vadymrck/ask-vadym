"""Test assertion helpers."""


def assert_portfolio_response(response: str, expected_markers: list[str]) -> None:
    """
    Assert that response is relevant to portfolio content.

    Args:
        response: Response text to check.
        expected_markers: List of expected terms/markers.

    Raises:
        AssertionError: If response doesn't contain expected markers.
    """
    assert len(response) > 0, "Response should not be empty"

    response_lower = response.lower()
    found = any(marker.lower() in response_lower for marker in expected_markers)

    assert found, f"Response should contain at least one of: {expected_markers}"
