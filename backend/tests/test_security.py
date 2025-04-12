from back_end import hash_password, verify_password


def test_hash_and_verify_password():
    raw_password = "secure123"
    hashed = hash_password(raw_password)

    assert hashed != raw_password
    assert verify_password(raw_password, hashed) is True
    assert verify_password("wrong_password", hashed) is False
