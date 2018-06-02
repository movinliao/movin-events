#include "stable.h"

#include "cloneable.h"

namespace base{
	Cloneable::Cloneable( void )
		: QObject(NULL)
	{

	}

	Cloneable::~Cloneable( void )
	{
		_variants.clear();
	}

	bool Cloneable::empty() const
	{
		return _variants.empty();
	}

	bool Cloneable::same( QSharedPointer<Cloneable> other )
	{
		return !other.isNull() && cmp(*(other.data()));
	}

	bool Cloneable::cmp( const Cloneable &other ) const
	{
		if(_variants.size() != other._variants.size())
		{
			return false;
		}
		QVariantMap::const_iterator itr = other._variants.begin();
		for (; itr  != other._variants.end(); ++itr)
		{
			QVariantMap::const_iterator fitr = _variants.find(itr->first);
			if(fitr == _variants.end() || (fitr->second != itr->second))
			{
				return false;
			}
		}
		return true;
	}

	std::string Cloneable::toString()
	{
		return "";
	}

	QSharedPointer<Cloneable> Cloneable::clone()
	{
		QSharedPointer<Cloneable> result = QSharedPointer<Cloneable>(new Cloneable());
		result->_variants = _variants;
		return result;
	}

	void Cloneable::clear()
	{
		_variants.clear();
	}
}

